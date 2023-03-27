import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

const loginUserSuccess = (name, email, token) => ({
	type: LOGIN_SUCCESS,
	payload: { name, email, token },
});

const logout = (user) => ({
	type: LOGOUT,
	payload: user,
});

export { loginUserSuccess, logout };
