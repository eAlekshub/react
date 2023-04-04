import { addCourse, updateCourse, delCourse } from './actionCreators';

const addCourseThunk = (course, onSuccess) => {
	return async (dispatch, getState) => {
		const token = getState().user.token;

		try {
			const response = await fetch('http://localhost:4000/courses/add', {
				method: 'POST',
				headers: {
					Authorization: token,
					'Content-Type': 'application/json',
				},
				body: JSON.stringify(course),
			});
			if (response.ok) {
				const data = await response.json();
				console.log('data:', data);
				dispatch(addCourse(data.result));
				onSuccess();
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

const delCourseThunk = (id) => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		console.log('token:', token);
		try {
			const response = await fetch(`http://localhost:4000/courses/${id}`, {
				method: 'DELETE',
				headers: {
					Authorization: token,
				},
			});
			if (response.ok) {
				const data = await response.json();
				console.log('data:', data);
				console.log('response:', response);
				dispatch(delCourse(id));
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

const updateCourseThunk = (course, onSuccess) => {
	return async (dispatch, getState) => {
		const token = getState().user.token;
		try {
			const response = await fetch(
				`http://localhost:4000/courses/${course.id}`,
				{
					method: 'PUT',
					headers: { Authorization: token, 'Content-Type': 'application/json' },
					body: JSON.stringify(course),
				}
			);
			if (response.ok) {
				console.log('response:', response);
				const data = await response.json();
				dispatch(updateCourse(data.result));
				onSuccess();
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};

export { delCourseThunk, updateCourseThunk, addCourseThunk };
