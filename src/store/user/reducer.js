import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
	role: '',
};

const userReduser = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const { name, email, token, role } = action.payload;
			return { ...state, isAuth: true, name, email, token, role };

		case LOGOUT:
			return {
				...state,
				isAuth: false,
				name: '',
				email: '',
				token: '',
				role: '',
			};

		default:
			return state;
	}
};

export default userReduser;
