import React, {useEffect, useState} from 'react';
import Hls from 'hls.js';

interface Props {}

function HLSVideo(props: Props): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	// const [player, setPlayer] = useState<videojs.Player | null>(null);
	useEffect(() => {
		if (!videoNode) return;
		// const videoSrc = 'https://test-streams.mux.dev/x36xhzz/x36xhzz.m3u8';
		const videoSrc = '/tmp/output/output.m3u8';
		const hls = new Hls();
		hls.loadSource(videoSrc);
		hls.attachMedia(videoNode);
	}, [videoNode]);
	return (
		<video
			controls
			autoPlay={false}
			ref={(node: any): void => setVideoNode(node)}
			style={{width: '100%'}}
		>
			HLSVideo
		</video>
	);
}

export default HLSVideo;
