import * as React from 'react';
import HLSVideo from 'components/HLSVideo';

interface Props {
	count: number;
	increment: () => void;
	decrement: () => void;
}

function SecondPage(props: Props): JSX.Element {
	return (
		<div>
			<HLSVideo />
		</div>
	);
}

export default SecondPage;
