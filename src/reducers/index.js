import { combineReducers } from 'redux';

const initialState = {
	data: []
};

const StockReducer = (state = initialState, action) => {
	switch (action.type) {
		default:
			return state;
	}
};

export default combineReducers({
	stock: StockReducer
});
