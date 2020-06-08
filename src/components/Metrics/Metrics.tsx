import React, {useEffect, useState} from 'react';
import {Line} from 'react-chartjs-2';

interface Props {
	metrics: {points: any[]};
}

const data = {
	labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
	datasets: [
		{
			label: 'My First dataset',
			backgroundColor: 'rgb(255, 99, 132)',
			borderColor: 'rgb(255, 99, 132)',
			data: [0, 10, 5, 2, 20, 30, 45],
		},
	],
};

function formatPoints(points: any): any {
	const labels = [];
	const bitrates = [];
	const bufferLevels = [];
	for (const p of points) {
		labels.push(`${p.t / 1000}s`);
		bitrates.push(p.bitrate);
		bufferLevels.push(p.bufferLevel);
	}

	const datasetTemplate = {
		label: '',
		fill: false,
		data: [],
	};
	return {
		labels,
		datasets: [
			{
				...datasetTemplate,
				...{
					label: 'Bit rates',
					data: bitrates,
					yAxisID: 'A',
					backgroundColor: '#ff6384',
					borderColor: '#ff6384',
				},
			},
			{
				...datasetTemplate,
				...{
					label: 'Buffer Level',
					data: bufferLevels,
					yAxisID: 'B',
					backgroundColor: '#36a2eb',
					borderColor: '#36a2eb',
				},
			},
		],
	};
}

const scales = {
	yAxes: [
		{
			id: 'A',
			type: 'linear',
			position: 'left',
		},
		{
			id: 'B',
			type: 'linear',
			position: 'right',
		},
		{
			id: 'C',
			type: 'linear',
			position: 'right',
		},
	],
};

function Metrics(props: Props): JSX.Element {
	const points = props.metrics.points;
	return (
		<div>
			<h3>
				Current Bitrate:{' '}
				{points.length && points[points.length - 1].bitrate}
			</h3>
			<Line data={formatPoints(points)} options={{scales}} height={80} />
		</div>
	);
}

export default Metrics;
