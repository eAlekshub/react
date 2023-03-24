import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

const authorsInitialState = [];

const authorsReducer = (state = authorsInitialState, action) => {
	switch (action.type) {
		case ADD_AUTHOR:
			return [...state, action.payload];

		case GET_AUTHORS:
			return [...action.payload];

		default:
			return state;
	}
};

export default authorsReducer;
