import {METRICS_ADD_POINT, METRICS_CLEAR} from 'actions';

const initialState = {
	points: [] as any[],
};

function AppReducer(state = initialState, action: Action): typeof initialState {
	switch (action.type) {
		case METRICS_ADD_POINT:
			return {
				...state,
				...{points: [...state.points, action.payload.data]},
			};
		case METRICS_CLEAR:
			return {...initialState};
		default:
			return state;
	}
}

export default AppReducer;
