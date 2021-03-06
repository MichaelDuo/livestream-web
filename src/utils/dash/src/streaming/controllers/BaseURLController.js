'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _BaseURLTreeModel=require('../models/BaseURLTreeModel');var _BaseURLTreeModel2=_interopRequireDefault(_BaseURLTreeModel);var _BaseURLSelector=require('../utils/BaseURLSelector');var _BaseURLSelector2=_interopRequireDefault(_BaseURLSelector);var _URLUtils=require('../utils/URLUtils');var _URLUtils2=_interopRequireDefault(_URLUtils);var _BaseURL=require('../../dash/vo/BaseURL');var _BaseURL2=_interopRequireDefault(_BaseURL);var _FactoryMaker=require('../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _EventBus=require('../../core/EventBus');var _EventBus2=_interopRequireDefault(_EventBus);var _Events=require('../../core/events/Events');var _Events2=_interopRequireDefault(_Events);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function BaseURLController(){var instance=void 0,adapter=void 0;var context=this.context;var eventBus=(0,_EventBus2.default)(context).getInstance();var urlUtils=(0,_URLUtils2.default)(context).getInstance();var baseURLTreeModel=void 0,baseURLSelector=void 0;function onBlackListChanged(e){baseURLTreeModel.invalidateSelectedIndexes(e.entry);}function setup(){baseURLTreeModel=(0,_BaseURLTreeModel2.default)(context).create();baseURLSelector=(0,_BaseURLSelector2.default)(context).create();eventBus.on(_Events2.default.SERVICE_LOCATION_BLACKLIST_CHANGED,onBlackListChanged,instance);}function setConfig(config){if(config.baseURLTreeModel){baseURLTreeModel=config.baseURLTreeModel;}if(config.baseURLSelector){baseURLSelector=config.baseURLSelector;}if(config.adapter){adapter=config.adapter;}}function update(manifest){baseURLTreeModel.update(manifest);baseURLSelector.chooseSelector(adapter.getIsDVB(manifest));}function resolve(path){var baseUrls=baseURLTreeModel.getForPath(path);var baseUrl=baseUrls.reduce(function(p,c){var b=baseURLSelector.select(c);if(b){if(!urlUtils.isRelative(b.url)){p.url=b.url;p.serviceLocation=b.serviceLocation;}else{p.url=urlUtils.resolve(b.url,p.url);}p.availabilityTimeOffset=b.availabilityTimeOffset;p.availabilityTimeComplete=b.availabilityTimeComplete;}else{return new _BaseURL2.default();}return p;},new _BaseURL2.default());if(!urlUtils.isRelative(baseUrl.url)){return baseUrl;}}function reset(){baseURLTreeModel.reset();baseURLSelector.reset();}function initialize(data){// report config to baseURLTreeModel and baseURLSelector
baseURLTreeModel.setConfig({adapter:adapter});update(data);}instance={reset:reset,initialize:initialize,resolve:resolve,setConfig:setConfig};setup();return instance;}/**
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
 */BaseURLController.__dashjs_factory_name='BaseURLController';exports.default=_FactoryMaker2.default.getClassFactory(BaseURLController);
//# sourceMappingURL=BaseURLController.js.map
