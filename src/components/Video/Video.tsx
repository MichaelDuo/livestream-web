import React, {useEffect, useState} from 'react';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
	mp4?: string;
	webm?: string;
}

const options: VideoJsPlayerOptions = {
	autoplay: false,
	controls: true,
	sources: [],
};
function Video(props: Props): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	const [player, setPlayer] = useState<videojs.Player | null>(null);
	useEffect(() => {
		if (!videoNode) return;
		options.sources = [
			{
				src: props.mp4 || '',
				type: 'video/mp4',
			},
		];
		const p = videojs(videoNode, options, function onPlayerReady() {
			console.log('onPlayerReady');
			(window as any).player = p;
		});
		setPlayer(p);
		return (): void => {
			if (player) player.dispose();
		};
	}, [videoNode]);

	return (
		<div data-vjs-player>
			<video
				width="600"
				ref={(node): void => setVideoNode(node)}
				className="video-js"
			></video>
		</div>
	);
}

export default Video;
