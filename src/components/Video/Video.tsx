import React, {useEffect, useState} from 'react';
import videojs from 'video.js';
import 'video.js/dist/video-js.css';

interface Props {
	mp4?: string;
	webm?: string;
}

function Video(props: Props): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	const [player, setPlayer] = useState<videojs.Player | null>(null);
	useEffect(() => {
		if (!videoNode) return;
		const player = videojs(
			videoNode,
			{
				autoplay: true,
				controls: true,
				sources: [
					{
						src: props.mp4 || '',
						type: 'video/mp4',
					},
				],
			},
			function onPlayerReady() {
				console.log('onPlayerReady');
				(window as any).player = player;
			}
		);
		setPlayer(player);
		return;
	}, [videoNode]);

	return (
		<div>
			<div data-vjs-player>
				<video
					width="600"
					ref={(node): void => setVideoNode(node)}
					className="video-js"
				></video>
			</div>
		</div>
	);
}

export default Video;
