import * as React from 'react';
import MainPage from './pages/MainPage';
import SecondPage from './pages/SecondPage';
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom';
import NavBar from 'components/NavBar';
import Page from 'components/Page';

const App = (): JSX.Element => (
	<div className="app">
		<NavBar />
		<Page>
			<Router>
				<Switch>
					<Route path="/2">
						<SecondPage />
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
