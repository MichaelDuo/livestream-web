'use strict';Object.defineProperty(exports,"__esModule",{value:true});var _FactoryMaker=require('../../core/FactoryMaker');var _FactoryMaker2=_interopRequireDefault(_FactoryMaker);var _SwitchRequest=require('./SwitchRequest');var _SwitchRequest2=_interopRequireDefault(_SwitchRequest);function _interopRequireDefault(obj){return obj&&obj.__esModule?obj:{default:obj};}/**
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
 */var SWITCH_REQUEST_HISTORY_DEPTH=8;// must be > SwitchHistoryRule SAMPLE_SIZE to enable rule
function SwitchRequestHistory(){var switchRequests=[];// running total
var srHistory=[];// history of each switch
function push(switchRequest){if(switchRequest.newValue===_SwitchRequest2.default.NO_CHANGE){switchRequest.newValue=switchRequest.oldValue;}if(!switchRequests[switchRequest.oldValue]){switchRequests[switchRequest.oldValue]={noDrops:0,drops:0,dropSize:0};}// Set switch details
var indexDiff=switchRequest.newValue-switchRequest.oldValue;var drop=indexDiff<0?1:0;var dropSize=drop?-indexDiff:0;var noDrop=drop?0:1;// Update running totals
switchRequests[switchRequest.oldValue].drops+=drop;switchRequests[switchRequest.oldValue].dropSize+=dropSize;switchRequests[switchRequest.oldValue].noDrops+=noDrop;// Save to history
srHistory.push({idx:switchRequest.oldValue,noDrop:noDrop,drop:drop,dropSize:dropSize});// Shift earliest switch off srHistory and readjust to keep depth of running totals constant
if(srHistory.length>SWITCH_REQUEST_HISTORY_DEPTH){var srHistoryFirst=srHistory.shift();switchRequests[srHistoryFirst.idx].drops-=srHistoryFirst.drop;switchRequests[srHistoryFirst.idx].dropSize-=srHistoryFirst.dropSize;switchRequests[srHistoryFirst.idx].noDrops-=srHistoryFirst.noDrop;}}function getSwitchRequests(){return switchRequests;}function reset(){switchRequests=[];srHistory=[];}return{push:push,getSwitchRequests:getSwitchRequests,reset:reset};}SwitchRequestHistory.__dashjs_factory_name='SwitchRequestHistory';var factory=_FactoryMaker2.default.getClassFactory(SwitchRequestHistory);exports.default=factory;
//# sourceMappingURL=SwitchRequestHistory.js.map
