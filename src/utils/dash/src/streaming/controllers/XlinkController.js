'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _XlinkLoader=require('../XlinkLoader');var _XlinkLoader2=_interopRequireDefault(_XlinkLoader);var _EventBus=require('../../core/EventBus');var _EventBus2=_interopRequireDefault(_EventBus);var _Events=require('../../core/events/Events');var _Events2=_interopRequireDefault(_Events);var _FactoryMaker=require('../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _xml2json=require('../../../externals/xml2json');var _xml2json2=_interopRequireDefault(_xml2json);var _URLUtils=require('../utils/URLUtils');var _URLUtils2=_interopRequireDefault(_URLUtils);var _DashConstants=require('../../dash/constants/DashConstants');var _DashConstants2=_interopRequireDefault(_DashConstants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}var RESOLVE_TYPE_ONLOAD='onLoad';/**
 * The copyright in this software is being made available under the BSD License,
 * included below. This software may be subject to other third party and contributor
 * rights, including patent rights, and no such rights are granted under this license.
 *
 * Copyright (c) 2013, Dash Industry Forum.
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without modification,
 * are permitted provided that the following conditions are met:
 *  * Redistributions of source code must retain the above copyright notice, this
 *  list of conditions and the following disclaimer.
 *  * Redistributions in binary form must reproduce the above copyright notice,
 *  this list of conditions and the following disclaimer in the documentation and/or
 *  other materials provided with the distribution.
 *  * Neither the name of Dash Industry Forum nor the names of its
 *  contributors may be used to endorse or promote products derived from this software
 *  without specific prior written permission.
 *
 *  THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS AS IS AND ANY
 *  EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 *  WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE DISCLAIMED.
 *  IN NO EVENT SHALL THE COPYRIGHT HOLDER OR CONTRIBUTORS BE LIABLE FOR ANY DIRECT,
 *  INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT
 *  NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR
 *  PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY,
 *  WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE)
 *  ARISING IN ANY WAY OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE
 *  POSSIBILITY OF SUCH DAMAGE.
 */var RESOLVE_TYPE_ONACTUATE='onActuate';var RESOLVE_TO_ZERO='urn:mpeg:dash:resolve-to-zero:2013';function XlinkController(config){config=config||{};var context=this.context;var eventBus=(0,_EventBus2.default)(context).getInstance();var urlUtils=(0,_URLUtils2.default)(context).getInstance();var instance=void 0,matchers=void 0,iron=void 0,manifest=void 0,converter=void 0,xlinkLoader=void 0;function setup(){eventBus.on(_Events2.default.XLINK_ELEMENT_LOADED,onXlinkElementLoaded,instance);xlinkLoader=(0,_XlinkLoader2.default)(context).create({errHandler:config.errHandler,dashMetrics:config.dashMetrics,mediaPlayerModel:config.mediaPlayerModel,requestModifier:config.requestModifier,settings:config.settings});}function setMatchers(value){if(value){matchers=value;}}function setIron(value){if(value){iron=value;}}/**
     * <p>Triggers the resolution of the xlink.onLoad attributes in the manifest file </p>
     * @param {Object} mpd - the manifest
     */function resolveManifestOnLoad(mpd){var elements=void 0;// First resolve all periods, so unnecessary requests inside onLoad Periods with Default content are avoided
converter=new _xml2json2.default({escapeMode:false,attributePrefix:'',arrayAccessForm:'property',emptyNodeForm:'object',stripWhitespaces:false,enableToStringFunc:false,ignoreRoot:true,matchers:matchers});manifest=mpd;elements=getElementsToResolve(manifest.Period_asArray,manifest,_DashConstants2.default.PERIOD,RESOLVE_TYPE_ONLOAD);resolve(elements,_DashConstants2.default.PERIOD,RESOLVE_TYPE_ONLOAD);}function reset(){eventBus.off(_Events2.default.XLINK_ELEMENT_LOADED,onXlinkElementLoaded,instance);if(xlinkLoader){xlinkLoader.reset();xlinkLoader=null;}}function resolve(elements,type,resolveType){var resolveObject={};var element=void 0,url=void 0;resolveObject.elements=elements;resolveObject.type=type;resolveObject.resolveType=resolveType;// If nothing to resolve, directly call allElementsLoaded
if(resolveObject.elements.length===0){onXlinkAllElementsLoaded(resolveObject);}for(var i=0;i<resolveObject.elements.length;i++){element=resolveObject.elements[i];if(urlUtils.isHTTPURL(element.url)){url=element.url;}else{url=element.originalContent.BaseURL+element.url;}xlinkLoader.load(url,element,resolveObject);}}function onXlinkElementLoaded(event){var element=void 0,resolveObject=void 0;var openingTag='<response>';var closingTag='</response>';var mergedContent='';element=event.element;resolveObject=event.resolveObject;// if the element resolved into content parse the content
if(element.resolvedContent){var index=0;// we add a parent elements so the converter is able to parse multiple elements of the same type which are not wrapped inside a container
if(element.resolvedContent.indexOf('<?xml')===0){index=element.resolvedContent.indexOf('?>')+2;//find the closing position of the xml declaration, if it exists.
}mergedContent=element.resolvedContent.substr(0,index)+openingTag+element.resolvedContent.substr(index)+closingTag;element.resolvedContent=converter.xml_str2json(mergedContent);}if(isResolvingFinished(resolveObject)){onXlinkAllElementsLoaded(resolveObject);}}// We got to wait till all elements of the current queue are resolved before merging back
function onXlinkAllElementsLoaded(resolveObject){var elements=[];var i=void 0,obj=void 0;mergeElementsBack(resolveObject);if(resolveObject.resolveType===RESOLVE_TYPE_ONACTUATE){eventBus.trigger(_Events2.default.XLINK_READY,{manifest:manifest});}if(resolveObject.resolveType===RESOLVE_TYPE_ONLOAD){switch(resolveObject.type){// Start resolving the other elements. We can do Adaptation Set and EventStream in parallel
case _DashConstants2.default.PERIOD:for(i=0;i<manifest[_DashConstants2.default.PERIOD+'_asArray'].length;i++){obj=manifest[_DashConstants2.default.PERIOD+'_asArray'][i];if(obj.hasOwnProperty(_DashConstants2.default.ADAPTATION_SET+'_asArray')){elements=elements.concat(getElementsToResolve(obj[_DashConstants2.default.ADAPTATION_SET+'_asArray'],obj,_DashConstants2.default.ADAPTATION_SET,RESOLVE_TYPE_ONLOAD));}if(obj.hasOwnProperty(_DashConstants2.default.EVENT_STREAM+'_asArray')){elements=elements.concat(getElementsToResolve(obj[_DashConstants2.default.EVENT_STREAM+'_asArray'],obj,_DashConstants2.default.EVENT_STREAM,RESOLVE_TYPE_ONLOAD));}}resolve(elements,_DashConstants2.default.ADAPTATION_SET,RESOLVE_TYPE_ONLOAD);break;case _DashConstants2.default.ADAPTATION_SET:// TODO: Resolve SegmentList here
eventBus.trigger(_Events2.default.XLINK_READY,{manifest:manifest});break;}}}// Returns the elements with the specific resolve Type
function getElementsToResolve(elements,parentElement,type,resolveType){var toResolve=[];var element=void 0,i=void 0,xlinkObject=void 0;// first remove all the resolve-to-zero elements
for(i=elements.length-1;i>=0;i--){element=elements[i];if(element.hasOwnProperty('xlink:href')&&element['xlink:href']===RESOLVE_TO_ZERO){elements.splice(i,1);}}// now get the elements with the right resolve type
for(i=0;i<elements.length;i++){element=elements[i];if(element.hasOwnProperty('xlink:href')&&element.hasOwnProperty('xlink:actuate')&&element['xlink:actuate']===resolveType){xlinkObject=createXlinkObject(element['xlink:href'],parentElement,type,i,resolveType,element);toResolve.push(xlinkObject);}}return toResolve;}function mergeElementsBack(resolveObject){var resolvedElements=[];var element=void 0,type=void 0,obj=void 0,i=void 0,j=void 0,k=void 0;// Start merging back from the end because of index shifting. Note that the elements with the same parent have to be ordered by index ascending
for(i=resolveObject.elements.length-1;i>=0;i--){element=resolveObject.elements[i];type=element.type+'_asArray';// Element couldn't be resolved or is TODO Inappropriate target: Remove all Xlink attributes
if(!element.resolvedContent||isInappropriateTarget()){delete element.originalContent['xlink:actuate'];delete element.originalContent['xlink:href'];resolvedElements.push(element.originalContent);}// Element was successfully resolved
else if(element.resolvedContent){for(j=0;j<element.resolvedContent[type].length;j++){//TODO Contains another Xlink attribute with xlink:actuate set to onload. Remove all xLink attributes
obj=element.resolvedContent[type][j];resolvedElements.push(obj);}}// Replace the old elements in the parent with the resolved ones
element.parentElement[type].splice(element.index,1);for(k=0;k<resolvedElements.length;k++){element.parentElement[type].splice(element.index+k,0,resolvedElements[k]);}resolvedElements=[];}if(resolveObject.elements.length>0){iron.run(manifest);}}function createXlinkObject(url,parentElement,type,index,resolveType,originalContent){return{url:url,parentElement:parentElement,type:type,index:index,resolveType:resolveType,originalContent:originalContent,resolvedContent:null,resolved:false};}// Check if all pending requests are finished
function isResolvingFinished(elementsToResolve){var i=void 0,obj=void 0;for(i=0;i<elementsToResolve.elements.length;i++){obj=elementsToResolve.elements[i];if(obj.resolved===false){return false;}}return true;}// TODO : Do some syntax check here if the target is valid or not
function isInappropriateTarget(){return false;}instance={resolveManifestOnLoad:resolveManifestOnLoad,setMatchers:setMatchers,setIron:setIron,reset:reset};setup();return instance;}XlinkController.__dashjs_factory_name='XlinkController';exports.default=_FactoryMaker2.default.getClassFactory(XlinkController);
//# sourceMappingURL=XlinkController.js.map
