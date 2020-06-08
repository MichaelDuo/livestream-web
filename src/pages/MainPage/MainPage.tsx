import React from 'react';
import './style.scss';

interface Props {
	count: number;
	increment: () => void;
	decrement: () => void;
}

function SecondPage(): JSX.Element {
	return (
		<div>
			<h1
				className="uk-heading-line uk-text-center"
				style={{marginBottom: '30px'}}
			>
				<span>{"Team Cat's Kidney"}</span>
			</h1>
			<div className="cat-wrapper">
				<div className="cat">
					<div className="ear ear--left"></div>
					<div className="ear ear--right"></div>
					<div className="face">
						<div className="eye eye--left">
							<div className="eye-pupil"></div>
						</div>
						<div className="eye eye--right">
							<div className="eye-pupil"></div>
						</div>
						<div className="muzzle"></div>
					</div>
				</div>
			</div>
			<div className="uk-margin">
				<h1 className="uk-heading-line">
					<span>Yuxi Dong</span>
				</h1>

				<h1 className="uk-heading-line uk-text-center">
					<span>Jiahao Ge</span>
				</h1>

				<h1 className="uk-heading-line uk-text-right">
					<span>Jie Lin</span>
				</h1>
			</div>
		</div>
	);
}

export default SecondPage;
