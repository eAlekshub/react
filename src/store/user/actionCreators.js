import { LOGIN_SUCCESS, LOGOUT } from './actionTypes';

const loginUserSuccess = (name, email, token, role) => ({
	type: LOGIN_SUCCESS,
	payload: { name, email, token, role },
});

const logout = () => ({
	type: LOGOUT,
});

export { loginUserSuccess, logout };
