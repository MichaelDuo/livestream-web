import React, {useEffect, useState} from 'react';
import dashjs, {MediaPlayerClass, MediaPlayerSettingClass} from 'dashjs';
import 'utils/controlbar/controlbar.scss';

interface Props {
	listener: (e: any) => void;
}

const customABR = false;

// const url = '/tmp/test/output/output.mpd';
const url = 'https://dash.akamaized.net/akamai/bbb_30fps/bbb_30fps.mpd';

const config: MediaPlayerSettingClass = {
	streaming: {
		fastSwitchEnabled: true,
		jumpGaps: true,
		abr: {
			// ABRStrategy: 'abrDynamic', // 'abrBola',
			ABRStrategy: 'abrBola',
			autoSwitchBitrate: {video: true},
		},
		scheduleWhilePaused: false,
	},
};

function DashVideo(props: Props): JSX.Element {
	const [videoNode, setVideoNode] = useState<HTMLVideoElement | null>(null);
	let player: MediaPlayerClass | null = null;
	let t = -1;

	let timer: NodeJS.Timeout | null = null;

	function emit(e: any): void {
		if (props.listener) props.listener(e);
	}

	function updateMetrics(): void {
		if (!player) return;
		const type = 'video';
		const metrics = player.getDashMetrics();
		const adapter = player.getDashAdapter();
		const streamInfo = player.getActiveStream()?.getStreamInfo();
		if (!streamInfo) return;

		const bufferLevel = metrics.getCurrentBufferLevel(type);
		const repSwitch = metrics.getCurrentRepresentationSwitch(type) as any;
		const bitrate = repSwitch
			? Math.round(
					adapter.getBandwidthForRepresentation(
						repSwitch.to,
						streamInfo.index
					) / 1000
			  )
			: NaN;
		const droppedFramesMetrics = metrics.getCurrentDroppedFrames();
		const droppedFPS = droppedFramesMetrics
			? droppedFramesMetrics.droppedFrames
			: 0;
		emit({t: t, bufferLevel, bitrate, droppedFrames: droppedFPS});
	}

	function startRecording(): void {
		const f = (): void => {
			if (t === -1) t = 0;
			else t += 1000;
			updateMetrics();
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
		player = dashjs.MediaPlayer().create();
		if (!player) return;
		player.initialize(videoNode, url, false);
		player.updateSettings(config);
		player.updateSettings;
		player.on(dashjs.MediaPlayer.events.PLAYBACK_STARTED, () => {
			startRecording();
		});
		player.on(dashjs.MediaPlayer.events.PLAYBACK_PAUSED, () => {
			stopRecording();
		});

		if (customABR) {
			player.on(dashjs.MediaPlayer.events.BUFFER_EMPTY, () => {
				player?.updateSettings({
					streaming: {
						abr: {
							autoSwitchBitrate: {video: false},
						},
					},
				});
				player?.setQualityFor('video', 0);
				player?.setQualityFor('audio', 0);
			});
			player.on(dashjs.MediaPlayer.events.BUFFER_LOADED, () => {
				setTimeout(() => {
					player?.updateSettings({
						streaming: {
							abr: {
								autoSwitchBitrate: {video: true},
							},
						},
					});
				}, 10000);
			});
		}
	}, [videoNode]);

	return (
		<div>
			<video
				controls
				ref={(node: any): void => setVideoNode(node)}
				style={{width: '100%'}}
			>
				DashVideo
			</video>
		</div>
	);
}

export default DashVideo;
