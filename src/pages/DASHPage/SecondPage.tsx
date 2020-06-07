import * as React from 'react';
import DashVideo from 'components/DashVideo';

interface Props {
	count: number;
	increment: () => void;
	decrement: () => void;
}

function SecondPage(props: Props): JSX.Element {
	return (
		<div>
			<DashVideo />
		</div>
	);
}

export default SecondPage;
