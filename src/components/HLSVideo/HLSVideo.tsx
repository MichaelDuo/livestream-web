import React, {useEffect, useState} from 'react';
import Hls from 'hls.js';

// const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
const videoSrc = '/tmp/hls-movie/playlist.m3u8';
const config = {
	autoStartLoad: false,
	maxBufferLength: 5,
};
function HLSVideo(): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	// const [player, setPlayer] = useState<videojs.Player | null>(null);
	const hls = new Hls(config);
	hls.loadSource(videoSrc);
	useEffect(() => {
		if (!videoNode) return;
		hls.attachMedia(videoNode);
	}, [videoNode]);

	const play = (): void => {
		hls.startLoad();
	};
	return (
		<video
			controls
			autoPlay={false}
			ref={(node: any): void => setVideoNode(node)}
			style={{width: '100%'}}
			onClick={(): void => play()}
		>
			HLSVideo
		</video>
	);
}

export default HLSVideo;
