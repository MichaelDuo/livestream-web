import {combineReducers, Reducer, StateFromReducersMapObject} from 'redux';
import {History} from 'history';
import {connectRouter, RouterState} from 'connected-react-router';
import AppReducer from './AppReducer';
import MetricsReducer from './MetricsReducer';

const reducers = {
	App: AppReducer,
	Metrics: MetricsReducer,
};

export default (
	history: History
): Reducer<
	StateFromReducersMapObject<typeof reducers & {router: Reducer<RouterState>}>
> => {
	const rootReducer = combineReducers({
		...{router: connectRouter(history)},
		...reducers,
	});
	return rootReducer;
};
