'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _BaseMatcher2=require('./BaseMatcher');var _BaseMatcher3=_interopRequireDefault(_BaseMatcher2);var _Constants=require('../../../streaming/constants/Constants');var _Constants2=_interopRequireDefault(_Constants);var _DashConstants=require('../../constants/DashConstants');var _DashConstants2=_interopRequireDefault(_DashConstants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function _classCallCheck(instance,Constructor){if(!(instance instanceof Constructor)){throw new TypeError("Cannot call a class as a function");}}function _possibleConstructorReturn(self,call){if(!self){throw new ReferenceError("this hasn't been initialised - super() hasn't been called");}return call&&(typeof call==="object"||typeof call==="function")?call:self;}function _inherits(subClass,superClass){if(typeof superClass!=="function"&&superClass!==null){throw new TypeError("Super expression must either be null or a function, not "+typeof superClass);}subClass.prototype=Object.create(superClass&&superClass.prototype,{constructor:{value:subClass,enumerable:false,writable:true,configurable:true}});if(superClass)Object.setPrototypeOf?Object.setPrototypeOf(subClass,superClass):subClass.__proto__=superClass;}/**
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
 *//**
 * @classdesc matches and converts xs:duration to seconds
 */var durationRegex=/^([-])?P(([\d.]*)Y)?(([\d.]*)M)?(([\d.]*)D)?T?(([\d.]*)H)?(([\d.]*)M)?(([\d.]*)S)?/;var SECONDS_IN_YEAR=365*24*60*60;var SECONDS_IN_MONTH=30*24*60*60;var SECONDS_IN_DAY=24*60*60;var SECONDS_IN_HOUR=60*60;var SECONDS_IN_MIN=60;var DurationMatcher=function(_BaseMatcher){_inherits(DurationMatcher,_BaseMatcher);function DurationMatcher(){_classCallCheck(this,DurationMatcher);return _possibleConstructorReturn(this,(DurationMatcher.__proto__||Object.getPrototypeOf(DurationMatcher)).call(this,function(attr){var attributeList=[_DashConstants2.default.MIN_BUFFER_TIME,_DashConstants2.default.MEDIA_PRESENTATION_DURATION,_DashConstants2.default.MINIMUM_UPDATE_PERIOD,_DashConstants2.default.TIMESHIFT_BUFFER_DEPTH,_DashConstants2.default.MAX_SEGMENT_DURATION,_DashConstants2.default.MAX_SUBSEGMENT_DURATION,_DashConstants2.default.SUGGESTED_PRESENTATION_DELAY,_DashConstants2.default.START,_Constants2.default.START_TIME,_DashConstants2.default.DURATION];var len=attributeList.length;for(var i=0;i<len;i++){if(attr.nodeName===attributeList[i]){return durationRegex.test(attr.value);}}return false;},function(str){//str = "P10Y10M10DT10H10M10.1S";
var match=durationRegex.exec(str);var result=parseFloat(match[3]||0)*SECONDS_IN_YEAR+parseFloat(match[5]||0)*SECONDS_IN_MONTH+parseFloat(match[7]||0)*SECONDS_IN_DAY+parseFloat(match[9]||0)*SECONDS_IN_HOUR+parseFloat(match[11]||0)*SECONDS_IN_MIN+parseFloat(match[13]||0);if(match[1]!==undefined){result=-result;}return result;}));}return DurationMatcher;}(_BaseMatcher3.default);exports.default=DurationMatcher;
//# sourceMappingURL=DurationMatcher.js.map
