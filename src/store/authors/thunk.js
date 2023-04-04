import { addAuthor } from './actionCreators';

const addAuthorThunk = (author) => {
	return async (dispatch, getState) => {
		const token = getState().user.token;

		try {
			const response = await fetch('http://localhost:4000/authors/add', {
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(author),
			});
			if (response.ok) {
				const data = await response.json();
				console.log('data:', data);
				dispatch(addAuthor(data.result));
				console.log('GET:', data);
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

export { addAuthorThunk };
