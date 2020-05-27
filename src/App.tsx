import * as React from 'react';
import MainPage from './pages/MainPage';
import HLSPage from './pages/HLSPage';
import DASHPage from './pages/DASHPage';
import RTMPPage from './pages/RTMPPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from 'components/NavBar';
import Page from 'components/Page';

const App = (): JSX.Element => (
	<div className="app">
		<NavBar />
		<Page>
			<Router>
				<Switch>
					<Route path="/hls">
						<HLSPage />
					</Route>
					<Route path="/dash">
						<DASHPage />
					</Route>
					<Route path="/rtmp">
						<RTMPPage />
					</Route>
					<Route path="/">
						<MainPage />
					</Route>
				</Switch>
			</Router>
		</Page>
	</div>
);

export default App;
