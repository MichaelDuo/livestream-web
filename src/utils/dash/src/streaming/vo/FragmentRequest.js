'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _createClass=function(){function defineProperties(target,props){for(var i=0;i<props.length;i++){var descriptor=props[i];descriptor.enumerable=descriptor.enumerable||false;descriptor.configurable=true;if("value"in descriptor)descriptor.writable=true;Object.defineProperty(target,descriptor.key,descriptor);}}return function(Constructor,protoProps,staticProps){if(protoProps)defineProperties(Constructor.prototype,protoProps);if(staticProps)defineProperties(Constructor,staticProps);return Constructor;};}();/**
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
 */var _HTTPRequest=require('../vo/metrics/HTTPRequest');function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}/**
 * @class
 * @ignore
 */var FragmentRequest=function(){function FragmentRequest(url){_classCallCheck(this,FragmentRequest);this.action=FragmentRequest.ACTION_DOWNLOAD;this.startTime=NaN;this.mediaType=null;this.mediaInfo=null;this.type=null;this.duration=NaN;this.timescale=NaN;this.range=null;this.url=url||null;this.serviceLocation=null;this.requestStartDate=null;this.firstByteDate=null;this.requestEndDate=null;this.quality=NaN;this.index=NaN;this.availabilityStartTime=null;this.availabilityEndTime=null;this.wallStartTime=null;this.bytesLoaded=NaN;this.bytesTotal=NaN;this.delayLoadingTime=NaN;this.responseType='arraybuffer';this.representationId=null;}_createClass(FragmentRequest,[{key:'isInitializationRequest',value:function isInitializationRequest(){return this.type&&this.type===_HTTPRequest.HTTPRequest.INIT_SEGMENT_TYPE;}},{key:'setInfo',value:function setInfo(info){this.type=info&&info.init?_HTTPRequest.HTTPRequest.INIT_SEGMENT_TYPE:_HTTPRequest.HTTPRequest.MEDIA_SEGMENT_TYPE;this.url=info&&info.url?info.url:null;this.range=info&&info.range?info.range.start+'-'+info.range.end:null;this.mediaType=info&&info.mediaType?info.mediaType:null;}}]);return FragmentRequest;}();FragmentRequest.ACTION_DOWNLOAD='download';FragmentRequest.ACTION_COMPLETE='complete';exports.default=FragmentRequest;
//# sourceMappingURL=FragmentRequest.js.map
