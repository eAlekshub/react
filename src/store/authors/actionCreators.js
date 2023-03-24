import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

const addAuthor = (author) => {
	return { type: ADD_AUTHOR, payload: { author } };
};

const getAuthors = (authors) => {
	return { type: GET_AUTHORS, payload: { authors } };
};

export { addAuthor, getAuthors };
