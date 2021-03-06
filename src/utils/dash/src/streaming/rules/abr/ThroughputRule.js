'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _FactoryMaker=require('../../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _Debug=require('../../../core/Debug');var _Debug2=_interopRequireDefault(_Debug);var _SwitchRequest=require('../SwitchRequest');var _SwitchRequest2=_interopRequireDefault(_SwitchRequest);var _Constants=require('../../constants/Constants');var _Constants2=_interopRequireDefault(_Constants);var _MetricsConstants=require('../../constants/MetricsConstants');var _MetricsConstants2=_interopRequireDefault(_MetricsConstants);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}function ThroughputRule(config){config=config||{};var context=this.context;var dashMetrics=config.dashMetrics;var instance=void 0,logger=void 0;function setup(){logger=(0,_Debug2.default)(context).getInstance().getLogger(instance);}function checkConfig(){if(!dashMetrics||!dashMetrics.hasOwnProperty('getCurrentBufferState')){throw new Error(_Constants2.default.MISSING_CONFIG_ERROR);}}function getMaxIndex(rulesContext){var switchRequest=(0,_SwitchRequest2.default)(context).create();if(!rulesContext||!rulesContext.hasOwnProperty('getMediaInfo')||!rulesContext.hasOwnProperty('getMediaType')||!rulesContext.hasOwnProperty('useBufferOccupancyABR')||!rulesContext.hasOwnProperty('getAbrController')||!rulesContext.hasOwnProperty('getScheduleController')){return switchRequest;}checkConfig();var mediaInfo=rulesContext.getMediaInfo();var mediaType=rulesContext.getMediaType();var currentBufferState=dashMetrics.getCurrentBufferState(mediaType);var scheduleController=rulesContext.getScheduleController();var abrController=rulesContext.getAbrController();var streamInfo=rulesContext.getStreamInfo();var isDynamic=streamInfo&&streamInfo.manifestInfo?streamInfo.manifestInfo.isDynamic:null;var throughputHistory=abrController.getThroughputHistory();var throughput=throughputHistory.getSafeAverageThroughput(mediaType,isDynamic);var latency=throughputHistory.getAverageLatency(mediaType);var useBufferOccupancyABR=rulesContext.useBufferOccupancyABR();if(isNaN(throughput)||!currentBufferState||useBufferOccupancyABR){return switchRequest;}if(abrController.getAbandonmentStateFor(mediaType)!==_MetricsConstants2.default.ABANDON_LOAD){if(currentBufferState.state===_MetricsConstants2.default.BUFFER_LOADED||isDynamic){switchRequest.quality=abrController.getQualityForBitrate(mediaInfo,throughput,latency);scheduleController.setTimeToLoadDelay(0);logger.debug('['+mediaType+'] requesting switch to index: ',switchRequest.quality,'Average throughput',Math.round(throughput),'kbps');switchRequest.reason={throughput:throughput,latency:latency};}}return switchRequest;}function reset(){// no persistent information to reset
}instance={getMaxIndex:getMaxIndex,reset:reset};setup();return instance;}/**
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
 */ThroughputRule.__dashjs_factory_name='ThroughputRule';exports.default=_FactoryMaker2.default.getClassFactory(ThroughputRule);
//# sourceMappingURL=ThroughputRule.js.map
