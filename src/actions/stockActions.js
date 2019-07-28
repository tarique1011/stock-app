import { UPDATE_DATA } from './types';

export const updateData = data => {
	return {
		type: UPDATE_DATA,
		payload: data
	};
};
