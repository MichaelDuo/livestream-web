import * as React from 'react';
import VideoJSPage from './pages/VideoJSPage';
import HLSPage from './pages/HLSPage';
import DASHPage from './pages/DASHPage';
import MainPage from './pages/MainPage';
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
					<Route path="/videojs">
						<VideoJSPage />
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
