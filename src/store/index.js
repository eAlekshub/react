import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';

import authorsReducer from './authors/reducer';
import coursesReducer from './courses/reducer';
import userReduser from './user/reducer';

const rootReducer = combineReducers({
	authors: authorsReducer,
	courses: coursesReducer,
	user: userReduser,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
