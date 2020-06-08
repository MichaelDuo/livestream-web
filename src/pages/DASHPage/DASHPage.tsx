import React, {useEffect} from 'react';
import DashVideo from 'components/DashVideo';
import Metrics from 'components/Metrics';

interface Props {
	clearMetrics: () => void;
	addPoint: (data: any) => void;
}

function SecondPage(props: Props): JSX.Element {
	useEffect(() => {
		props.clearMetrics();
	}, []);

	const listener = (e: any): void => {
		props.addPoint(e);
	};

	return (
		<div>
			<div className="videoWrapper">
				<DashVideo listener={listener} />
			</div>
			<div className="metricsWrapper">
				<Metrics />
			</div>
		</div>
	);
}

export default SecondPage;
