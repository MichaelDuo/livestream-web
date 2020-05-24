import React from 'react';

function NavBar(): JSX.Element {
	return (
		<nav className="uk-navbar-container" uk-navbar="true">
			<div className="uk-navbar-left">
				<ul className="uk-navbar-nav">
					<li className="uk-active">
						<a href="">Video Player</a>
					</li>
				</ul>
			</div>
		</nav>
	);
}

export default NavBar;
