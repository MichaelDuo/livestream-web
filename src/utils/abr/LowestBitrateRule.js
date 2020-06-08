/**
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
 */

import dashjs from 'dashjs';

// Rule that selects the lowest possible bitrate
function LowestBitrateRuleClass() {
	const factory = dashjs.FactoryMaker;
	const SwitchRequest = factory.getClassFactoryByName('SwitchRequest');
	const MetricsModel = factory.getSingletonFactoryByName('MetricsModel');
	const MediaPlayerModel = factory.getSingletonFactoryByName(
		'MediaPlayerModel'
	);
	console.log('M', MediaPlayerModel().getInstance());

	const StreamController = factory.getSingletonFactoryByName(
		'StreamController'
	);
	const context = this.context;

	function setup() {
		return;
	}

	// Always use lowest bitrate
	function getMaxIndex(rulesContext) {
		// here you can get some informations aboit metrics for example, to implement the rule
		const metricsModel = MetricsModel(context).getInstance();
		const mediaType = rulesContext.getMediaInfo().type;
		const metrics = metricsModel.getMetricsFor(mediaType, true);

		// A smarter (real) rule could need analyze playback metrics to take
		// bitrate switching decision. Printing metrics here as a reference
		// console.log(metrics);

		// Get current bitrate
		const streamController = StreamController(context).getInstance();
		const abrController = rulesContext.getAbrController();
		const current = abrController.getQualityFor(
			mediaType,
			streamController.getActiveStreamInfo()
		);

		// If already in lowest bitrate, don't do anything
		if (current === 0) {
			return SwitchRequest(context).create();
		}

		// Ask to switch to the lowest bitrate
		const switchRequest = SwitchRequest(context).create();
		switchRequest.quality = 0;
		switchRequest.reason = 'Always switching to the lowest bitrate';
		switchRequest.priority = SwitchRequest.PRIORITY.STRONG;
		return switchRequest;
	}

	const instance = {
		getMaxIndex: getMaxIndex,
	};

	setup();

	return instance;
}

LowestBitrateRuleClass.__dashjs_factory_name = 'LowestBitrateRule';
export default dashjs.FactoryMaker.getClassFactory(LowestBitrateRuleClass);
