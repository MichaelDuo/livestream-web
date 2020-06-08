'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _CommonEncryption=require('./../CommonEncryption');var _CommonEncryption2=_interopRequireDefault(_CommonEncryption);var _KeySystemClearKey=require('./../drm/KeySystemClearKey');var _KeySystemClearKey2=_interopRequireDefault(_KeySystemClearKey);var _KeySystemW3CClearKey=require('./../drm/KeySystemW3CClearKey');var _KeySystemW3CClearKey2=_interopRequireDefault(_KeySystemW3CClearKey);var _KeySystemWidevine=require('./../drm/KeySystemWidevine');var _KeySystemWidevine2=_interopRequireDefault(_KeySystemWidevine);var _KeySystemPlayReady=require('./../drm/KeySystemPlayReady');var _KeySystemPlayReady2=_interopRequireDefault(_KeySystemPlayReady);var _DRMToday=require('./../servers/DRMToday');var _DRMToday2=_interopRequireDefault(_DRMToday);var _PlayReady=require('./../servers/PlayReady');var _PlayReady2=_interopRequireDefault(_PlayReady);var _Widevine=require('./../servers/Widevine');var _Widevine2=_interopRequireDefault(_Widevine);var _ClearKey=require('./../servers/ClearKey');var _ClearKey2=_interopRequireDefault(_ClearKey);var _ProtectionConstants=require('../../constants/ProtectionConstants');var _ProtectionConstants2=_interopRequireDefault(_ProtectionConstants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
 * @module ProtectionKeyController
 * @ignore
 * @description Media protection key system functionality that can be modified/overridden by applications
 *//**
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
 */function ProtectionKeyController(){var context=this.context;var instance=void 0,debug=void 0,logger=void 0,keySystems=void 0,BASE64=void 0,clearkeyKeySystem=void 0,clearkeyW3CKeySystem=void 0;function setConfig(config){if(!config)return;if(config.debug){debug=config.debug;logger=debug.getLogger(instance);}if(config.BASE64){BASE64=config.BASE64;}}function initialize(){keySystems=[];var keySystem=void 0;// PlayReady
keySystem=(0,_KeySystemPlayReady2.default)(context).getInstance({BASE64:BASE64});keySystems.push(keySystem);// Widevine
keySystem=(0,_KeySystemWidevine2.default)(context).getInstance({BASE64:BASE64});keySystems.push(keySystem);// ClearKey
keySystem=(0,_KeySystemClearKey2.default)(context).getInstance({BASE64:BASE64});keySystems.push(keySystem);clearkeyKeySystem=keySystem;// W3C ClearKey
keySystem=(0,_KeySystemW3CClearKey2.default)(context).getInstance({BASE64:BASE64,debug:debug});keySystems.push(keySystem);clearkeyW3CKeySystem=keySystem;}/**
     * Returns a prioritized list of key systems supported
     * by this player (not necessarily those supported by the
     * user agent)
     *
     * @returns {Array.<KeySystem>} a prioritized
     * list of key systems
     * @memberof module:ProtectionKeyController
     * @instance
     */function getKeySystems(){return keySystems;}/**
     * Sets the prioritized list of key systems to be supported
     * by this player.
     *
     * @param {Array.<KeySystem>} newKeySystems the new prioritized
     * list of key systems
     * @memberof module:ProtectionKeyController
     * @instance
     */function setKeySystems(newKeySystems){keySystems=newKeySystems;}/**
     * Returns the key system associated with the given key system string
     * name (i.e. 'org.w3.clearkey')
     *
     * @param {string} systemString the system string
     * @returns {KeySystem|null} the key system
     * or null if no supported key system is associated with the given key
     * system string
     * @memberof module:ProtectionKeyController
     * @instance
     */function getKeySystemBySystemString(systemString){for(var i=0;i<keySystems.length;i++){if(keySystems[i].systemString===systemString){return keySystems[i];}}return null;}/**
     * Determines whether the given key system is ClearKey.  This is
     * necessary because the EME spec defines ClearKey and its method
     * for providing keys to the key session; and this method has changed
     * between the various API versions.  Our EME-specific ProtectionModels
     * must know if the system is ClearKey so that it can format the keys
     * according to the particular spec version.
     *
     * @param {Object} keySystem the key
     * @returns {boolean} true if this is the ClearKey key system, false
     * otherwise
     * @memberof module:ProtectionKeyController
     * @instance
     */function isClearKey(keySystem){return keySystem===clearkeyKeySystem||keySystem===clearkeyW3CKeySystem;}/**
     * Check equality of initData array buffers.
     *
     * @param {ArrayBuffer} initData1 - first initData
     * @param {ArrayBuffer} initData2 - second initData
     * @returns {boolean} true if the initData arrays are equal in size and
     * contents, false otherwise
     * @memberof module:ProtectionKeyController
     * @instance
     */function initDataEquals(initData1,initData2){if(initData1.byteLength===initData2.byteLength){var data1=new Uint8Array(initData1);var data2=new Uint8Array(initData2);for(var j=0;j<data1.length;j++){if(data1[j]!==data2[j]){return false;}}return true;}return false;}/**
     * Returns a set of supported key systems and CENC initialization data
     * from the given array of ContentProtection elements.  Only
     * key systems that are supported by this player will be returned.
     * Key systems are returned in priority order (highest first).
     *
     * @param {Array.<Object>} cps - array of content protection elements parsed
     * from the manifest
     * @returns {Array.<Object>} array of objects indicating which supported key
     * systems were found.  Empty array is returned if no
     * supported key systems were found
     * @memberof module:ProtectionKeyController
     * @instance
     */function getSupportedKeySystemsFromContentProtection(cps){var cp=void 0,ks=void 0,ksIdx=void 0,cpIdx=void 0;var supportedKS=[];if(cps){for(ksIdx=0;ksIdx<keySystems.length;++ksIdx){ks=keySystems[ksIdx];for(cpIdx=0;cpIdx<cps.length;++cpIdx){cp=cps[cpIdx];if(cp.schemeIdUri.toLowerCase()===ks.schemeIdURI){// Look for DRM-specific ContentProtection
var initData=ks.getInitData(cp);supportedKS.push({ks:keySystems[ksIdx],initData:initData,cdmData:ks.getCDMData(),sessionId:ks.getSessionId(cp)});}}}}return supportedKS;}/**
     * Returns key systems supported by this player for the given PSSH
     * initializationData. Only key systems supported by this player
     * that have protection data present will be returned.  Key systems are returned in priority order
     * (highest priority first)
     *
     * @param {ArrayBuffer} initData Concatenated PSSH data for all DRMs
     * supported by the content
     * @param {ProtectionData} protDataSet user specified protection data - license server url etc
     * supported by the content
     * @returns {Array.<Object>} array of objects indicating which supported key
     * systems were found.  Empty array is returned if no
     * supported key systems were found
     * @memberof module:ProtectionKeyController
     * @instance
     */function getSupportedKeySystems(initData,protDataSet){var supportedKS=[];var pssh=_CommonEncryption2.default.parsePSSHList(initData);var ks=void 0,keySystemString=void 0,shouldNotFilterOutKeySystem=void 0;for(var ksIdx=0;ksIdx<keySystems.length;++ksIdx){ks=keySystems[ksIdx];keySystemString=ks.systemString;shouldNotFilterOutKeySystem=protDataSet?keySystemString in protDataSet:true;if(ks.uuid in pssh&&shouldNotFilterOutKeySystem){supportedKS.push({ks:ks,initData:pssh[ks.uuid],cdmData:ks.getCDMData(),sessionId:ks.getSessionId()});}}return supportedKS;}/**
     * Returns the license server implementation data that should be used for this request.
     *
     * @param {KeySystem} keySystem the key system
     * associated with this license request
     * @param {ProtectionData} protData protection data to use for the
     * request
     * @param {string} [messageType="license-request"] the message type associated with this
     * request.  Supported message types can be found
     * {@link https://w3c.github.io/encrypted-media/#idl-def-MediaKeyMessageType|here}.
     * @returns {LicenseServer|null} the license server
     * implementation that should be used for this request or null if the player should not
     * pass messages of the given type to a license server
     * @memberof module:ProtectionKeyController
     * @instance
     *
     */function getLicenseServer(keySystem,protData,messageType){// Our default server implementations do not do anything with "license-release" or
// "individualization-request" messages, so we just send a success event
if(messageType==='license-release'||messageType==='individualization-request'){return null;}var licenseServerData=null;if(protData&&protData.hasOwnProperty('drmtoday')){licenseServerData=(0,_DRMToday2.default)(context).getInstance({BASE64:BASE64});}else if(keySystem.systemString===_ProtectionConstants2.default.WIDEVINE_KEYSTEM_STRING){licenseServerData=(0,_Widevine2.default)(context).getInstance();}else if(keySystem.systemString===_ProtectionConstants2.default.PLAYREADY_KEYSTEM_STRING){licenseServerData=(0,_PlayReady2.default)(context).getInstance();}else if(keySystem.systemString===_ProtectionConstants2.default.CLEARKEY_KEYSTEM_STRING){licenseServerData=(0,_ClearKey2.default)(context).getInstance();}return licenseServerData;}/**
     * Allows application-specific retrieval of ClearKey keys.
     *
     * @param {KeySystem} clearkeyKeySystem They exact ClearKey System to be used
     * @param {ProtectionData} protData protection data to use for the
     * request
     * @param {ArrayBuffer} message the key message from the CDM
     * @return {ClearKeyKeySet|null} the clear keys associated with
     * the request or null if no keys can be returned by this function
     * @memberof module:ProtectionKeyController
     * @instance
     */function processClearKeyLicenseRequest(clearkeyKeySystem,protData,message){try{return clearkeyKeySystem.getClearKeysFromProtectionData(protData,message);}catch(error){logger.error('Failed to retrieve clearkeys from ProtectionData');return null;}}function setProtectionData(protectionDataSet){var getProtectionData=function getProtectionData(keySystemString){var protData=null;if(protectionDataSet){protData=keySystemString in protectionDataSet?protectionDataSet[keySystemString]:null;}return protData;};for(var i=0;i<keySystems.length;i++){var keySystem=keySystems[i];if(keySystem.hasOwnProperty('init')){keySystem.init(getProtectionData(keySystem.systemString));}}}instance={initialize:initialize,setProtectionData:setProtectionData,isClearKey:isClearKey,initDataEquals:initDataEquals,getKeySystems:getKeySystems,setKeySystems:setKeySystems,getKeySystemBySystemString:getKeySystemBySystemString,getSupportedKeySystemsFromContentProtection:getSupportedKeySystemsFromContentProtection,getSupportedKeySystems:getSupportedKeySystems,getLicenseServer:getLicenseServer,processClearKeyLicenseRequest:processClearKeyLicenseRequest,setConfig:setConfig};return instance;}ProtectionKeyController.__dashjs_factory_name='ProtectionKeyController';exports.default=dashjs.FactoryMaker.getSingletonFactory(ProtectionKeyController);/* jshint ignore:line */
//# sourceMappingURL=ProtectionKeyController.js.map