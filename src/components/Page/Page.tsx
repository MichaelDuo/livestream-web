import React, {ReactNode} from 'react';

interface Props {
	children?: ReactNode;
}

function Page(props: Props): JSX.Element {
	return <div className="uk-margin">{props.children}</div>;
}

export default Page;
