import { createStore, combineReducers } from 'redux';
import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReduser from './user/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReduser,
});

const store = createStore(rootReducer);

export default store;
