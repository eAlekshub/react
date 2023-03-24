import {
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
	GET_COURSES,
} from './actionTypes';

const coursesInitialState = [];

const coursesReducer = (state = coursesInitialState, action) => {
	switch (action.type) {
		case ADD_COURSE:
			return [...state, action.payload];

		case DELETE_COURSE:
			return state.filter((course) => course.id !== action.payload);

		case UPDATE_COURSE:
			return state.map((course) =>
				course.id === action.payload.id ? action.payload : course
			);

		case GET_COURSES:
			return [...action.payload];

		default:
			return state;
	}
};

export default coursesReducer;
