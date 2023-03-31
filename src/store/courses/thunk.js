import { getAllCourses, addCourse, delCourse } from './actionCreators';

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
				console.log('data:', response);
				dispatch(delCourse(id));
			} else {
				throw new Error('Network response was not ok');
			}
		} catch (error) {
			throw new Error(error);
		}
	};
};
export { delCourseThunk };
