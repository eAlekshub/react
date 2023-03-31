import { loginUserSuccess, logout } from './actionCreators';

const getUserThunk = (url, token) => {
	return async (dispatch) => {
		try {
			const response = await fetch(url, {
				method: 'GET',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
			});
			if (response.ok) {
				const data = await response.json();
				const { name, email, role } = data.result;
				dispatch(loginUserSuccess(name, email, token, role));
				console.log('GET:', data);
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

const postUserThunk = (user, url, onSuccess) => {
	return async (dispatch) => {
		try {
			const response = await fetch(url, {
				method: 'POST',
				headers: {
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(user),
			});
			if (response.ok) {
				onSuccess();
				const data = await response.json();
				const dataString = JSON.stringify(data.result);
				localStorage.setItem('token', dataString);
				const { name, email } = data.user;
				console.log('POST:', data);
				dispatch(loginUserSuccess(name, email, dataString));
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

const delUserThunk = () => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		console.log('token:', token);
		try {
			const response = await fetch('http://localhost:4000/logout', {
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			});
			if (response.ok) {
				console.log('data:', response);
				dispatch(logout());
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

export { getUserThunk, postUserThunk, delUserThunk };
