import { ADD_AUTHOR, GET_AUTHORS } from './actionTypes';

const addAuthor = (author) => {
	return { type: ADD_AUTHOR, payload: author };
};

const getAllAuthors = (authors) => {
	return { type: GET_AUTHORS, payload: authors };
};

export { addAuthor, getAllAuthors };
