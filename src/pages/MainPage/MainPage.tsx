import React, {useEffect} from 'react';
import Video from 'components/Video';
import './styles.scss';

interface Props {
	count: number;
	increment: () => void;
	decrement: () => void;
}

const mp4 = 'http://localhost:8085/Bombay%20Beach%20w%20westworld.mov';
function MainPage(props: Props): JSX.Element {
	return (
		<div id="MainPage" className="uk-flex uk-flex-center">
			<div>
				<Video mp4={mp4} />
			</div>
		</div>
	);
}

export default MainPage;
