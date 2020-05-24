export {RootState} from 'store';

export interface Action {
	type: string;
	payload: any;
}

// Reducer State
export interface AppState {
	count: number;
}
