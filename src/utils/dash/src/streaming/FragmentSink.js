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
 *//**
 * The end place to put fragments after they have been fetched.
 * @interface FragmentSink
 * @ignore
 *//**
 * Append a chunk to the internal buffer. You should assume that the effects of this are asynchronous.
 * @function FragmentSink#append
 * @param {Object} chunk A loaded chunk like that generated by the FragmentController
 *//**
 * Remove data from within the specified time ranges.
 * @function FragmentSink#remove
 * @param {?Number} start The beginning of the range that should be removed from the sink's internal buffer. If NaN, it is regarded as unbounded.
 * @param {?Number} end The end of the range that should be removed from the sink's internal buffer. If NaN, it is regarded as unbounded.
 *//**
 * Abort an append operation currently ongoing.
 * @function FragmentSink#abort
 *//**
 * @function FragmentSink#getAllBufferRanges
 * @returns {Array} A TimeRanges-like object representing all the buffer ranges that are present in the sink.
 *//**
 * Remove all the data in the sink's internal buffer.
 * @function FragmentSink#reset
 */"use strict";
//# sourceMappingURL=FragmentSink.js.map