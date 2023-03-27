import { GET_COURSES, ADD_COURSE, DELETE_COURSE } from './actionTypes';

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

export { getAllCourses, addCourse, delCourse };
