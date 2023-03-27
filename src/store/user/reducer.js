import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

const userInitialState = {
	isAuth: false,
	name: '',
	email: '',
	token: '',
};

const userReduser = (state = userInitialState, action) => {
	switch (action.type) {
		case LOGIN_SUCCESS:
			const { name, email, token } = action.payload;
			return { ...state, isAuth: true, name, email, token };

		case LOGOUT:
			return { ...state, isAuth: false, name: '', email: '', token: '' };

		default:
			return state;
	}
};

export default userReduser;
