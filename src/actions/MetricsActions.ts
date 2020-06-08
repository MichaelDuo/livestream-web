import {Action} from 'types';

export const METRICS_ADD_POINT = 'METRICS_ADD_POINT';
export const METRICS_CLEAR = 'METRICS_CLEAR';

export default {
	addPoint: (data: any): Action => ({
		type: METRICS_ADD_POINT,
		payload: {
			data,
		},
	}),
	clear: (): Action => ({
		type: METRICS_CLEAR,
		payload: null,
	}),
};
