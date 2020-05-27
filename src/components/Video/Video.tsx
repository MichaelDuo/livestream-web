import React, {useEffect, useState} from 'react';
import videojs, {VideoJsPlayerOptions} from 'video.js';
import 'video.js/dist/video-js.css';
import './styles.scss';
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
		const p = videojs(videoNode, options);
		p.on('error', function () {
			console.log(p.error());
		});

		setPlayer(p);
		return (): void => {
			if (player) player.dispose();
		};
	}, [videoNode]);

	return (
		<div className="component-video">
			<div data-vjs-player>
				<video
					className="video-js"
					width="600"
					ref={(node: any): void => setVideoNode(node)}
				></video>
			</div>
		</div>
	);
}

export default Video;
