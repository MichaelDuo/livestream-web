import * as React from 'react';
import * as ReactDOM from 'react-dom';
import 'uikit/dist/css/uikit.min.css';
import 'uikit/dist/js/uikit.min.js';
import 'styles/index.scss';

import {Provider} from 'react-redux';
import {createStore} from 'redux';
import rootReducer from 'reducers';

import App from 'App';

const store = createStore(rootReducer);
export type RootState = ReturnType<typeof rootReducer>;

ReactDOM.render(
	<Provider store={store}>
		<App />
	</Provider>,
	document.getElementById('app')
);
