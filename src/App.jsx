import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import { LOGIN_SUCCESS } from '../src/store/user/actionTypes';
import { getData } from './servisces';

import './App.css';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const loginUserSuccess = (name, email, token) =>
		dispatch({
			type: LOGIN_SUCCESS,
			payload: { name, email, token },
		});

	useEffect(() => {
		const tokenString = localStorage.getItem('token');
		if (tokenString) {
			const token = JSON.parse(tokenString);
			getData('http://localhost:4000/users/me', token)
				.then((data) => {
					const { name, email } = data.result;
					loginUserSuccess(name, email, token);
					navigate('/courses');
				})
				.catch((error) => {
					throw new Error(error);
				});
		} else {
			navigate('/login');
		}
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	return (
		<div className='wrapper'>
			<Header />
			<Routes>
				<Route path='/' element={<Login />} />
				<Route path='/registration' element={<Registration />} />
				<Route path='/login' element={<Login />} />
				<Route path='/courses' element={<Courses />} />
				<Route path='/courses/add' element={<CreateCourse />} />
				<Route path='/courses/:courseId' element={<CourseInfo />} />
			</Routes>
		</div>
	);
}

export default App;
