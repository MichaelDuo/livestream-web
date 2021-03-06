import * as React from 'react';

interface Props {
	count: number;
	increment: () => void;
	decrement: () => void;
}

function SecondPage(props: Props): JSX.Element {
	return (
		<div>
			Second Page, Count is: {props.count}
			<button onClick={(): void => props.increment()}>Increment</button>
			<button onClick={(): void => props.decrement()}>Decrement</button>
		</div>
	);
}

export default SecondPage;
