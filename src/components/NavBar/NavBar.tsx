import React from 'react';
import {Link} from 'react-router-dom';

const pages = [
	{
		title: "Team Cat's kindney",
		url: '/',
	},
	{
		title: 'Video.js Player',
		url: '/videojs',
	},
	{
		title: 'HLS Stream',
		url: '/hls',
	},
	{
		title: 'DASH Stream',
		url: '/dash',
	},
];

interface Props {
	pathname: string;
}

function NavBar(props: Props): JSX.Element {
	return (
		<nav className="uk-navbar-container" uk-navbar="true">
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					{pages.map((p) => {
						return (
							<li
								className={
									props.pathname === p.url ? 'uk-active' : ''
								}
								key={p.url}
							>
								<Link to={p.url}>{p.title}</Link>
							</li>
						);
					})}
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
