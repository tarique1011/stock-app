import { combineReducers } from 'redux';
import { UPDATE_DATA } from '../actions/types';

const initialState = {
	data: []
};

const StockReducer = (state = initialState, action) => {
	switch (action.type) {
		case UPDATE_DATA:
			return { data: action.payload };
		default:
			return state;
	}
};

export default combineReducers({
	stock: StockReducer
});
