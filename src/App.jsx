import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import { loginUserSuccess } from './store/user/actionCreators';
import { getAllCourses } from './store/courses/actionCreators';
import { getAllAuthors } from './store/authors/actionCreators';
import { getData } from './servisces';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CreateCourse from './components/CreateCourse/CreateCourse';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const tokenString = localStorage.getItem('token');
		if (tokenString) {
			const token = JSON.parse(tokenString);
			getData('http://localhost:4000/users/me', token)
				.then((data) => {
					const { name, email } = data.result;
					dispatch(loginUserSuccess(name, email, token));
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

	useEffect(() => {
		getData('http://localhost:4000/courses/all')
			.then((data) => {
				dispatch(getAllCourses(data.result));
			})
			.catch((error) => {
				throw new Error(error);
			});

		getData('http://localhost:4000/authors/all')
			.then((data) => {
				dispatch(getAllAuthors(data.result));
			})
			.catch((error) => {
				throw new Error(error);
			});
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
