import React, {useEffect, useState} from 'react';
import dashjs from 'dashjs';
const ControlBar = require('utils/controlbar/controlbar').default;
import 'utils/controlbar/controlbar.scss';

interface Props {}

function DashVideo(props: Props): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	// const [player, setPlayer] = useState<videojs.Player | null>(null);
	const url = '/tmp/test/output/output.mpd';
	// const url = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';

	let timer: NodeJS.Timeout | null = null;
	let t = -1;

	const plotNode = (): void => {
		console.log('plot');
	};

	function startRecording(): void {
		const f = (): void => {
			if (t === -1) t = 0;
			else t += 1000;
		};
		f();
		timer = setInterval(f, 1000);
	}

	function stopRecording(): void {
		if (timer) {
			clearInterval(timer);
		}
	}

	useEffect(() => {
		if (!videoNode) return;
		const player = dashjs.MediaPlayer().create();
		player.initialize(videoNode, url, false);
		player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, () => {
			startRecording();
		});
		player.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
			stopRecording();
		});
	}, [videoNode]);

	return (
		<div>
			<div className="videoContainer" id="videoContainer">
				<video controls ref={(node: any): void => setVideoNode(node)}>
					DashVideo
				</video>
			</div>
		</div>
	);
}

export default DashVideo;
