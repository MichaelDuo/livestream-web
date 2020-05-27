import React from 'react';
import {Link} from 'react-router-dom';

function NavBar(): JSX.Element {
	return (
		<nav className="uk-navbar-container" uk-navbar="true">
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					<li className="uk-active">
						<Link to="/">Video Player</Link>
					</li>
					<li>
						<Link to="/hls">HLS Video</Link>
					</li>
					<li>
						<Link to="/rtmp">RTMP</Link>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
