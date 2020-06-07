import React from 'react';
import {Link} from 'react-router-dom';

const pages = [
	{
		title: 'Video Player',
		url: '/',
	},
	{
		title: 'HLS Stream',
		url: '/hls',
	},
	{
		title: 'DASH Stream',
		url: '/dash',
	},
	{
		title: 'RTMP Stream',
		url: '/rtmp',
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
