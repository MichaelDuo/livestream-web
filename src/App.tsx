import * as React from 'react';
import MainPage from './pages/MainPage';
import HLSPage from './pages/HLSPage';
import DASHPage from './pages/DASHPage';
import RTMPPage from './pages/RTMPPage';
import {Switch, Route} from 'react-router-dom';
import NavBar from 'components/NavBar';
import Page from 'components/Page';
import {ConnectedRouter} from 'connected-react-router';
import {history} from 'store';

const App = (): JSX.Element => (
	<div className="app">
		<ConnectedRouter history={history}>
			<NavBar />
			<Page>
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
			</Page>
		</ConnectedRouter>
	</div>
);

export default App;
