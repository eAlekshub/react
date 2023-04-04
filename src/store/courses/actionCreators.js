import {
	GET_COURSES,
	ADD_COURSE,
	DELETE_COURSE,
	UPDATE_COURSE,
} from './actionTypes';

const getAllCourses = (course) => ({
	type: GET_COURSES,
	payload: course,
});

const addCourse = (course) => ({
	type: ADD_COURSE,
	payload: course,
});

const delCourse = (id) => ({
	type: DELETE_COURSE,
	payload: id,
});

const updateCourse = (course) => ({
	type: UPDATE_COURSE,
	payload: course,
});

export { getAllCourses, addCourse, delCourse, updateCourse };
