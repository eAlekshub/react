import React, { useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';

import './App.css';

import { getAllCourses } from './store/courses/actionCreators';
import { getAllAuthors } from './store/authors/actionCreators';
import { getData } from './servisces';

import Header from './components/Header/Header';
import Registration from './components/Registration/Registration';
import Login from './components/Login/Login';
import Courses from './components/Courses/Courses';
import CourseInfo from './components/CourseInfo/CourseInfo';
import CourseForm from './components/CourseForm/CourseForm';
import PrivateRoute from './components/PrivateRouter/PrivateRouter';

function App() {
	const navigate = useNavigate();
	const dispatch = useDispatch();

	useEffect(() => {
		const tokenString = localStorage.getItem('token');
		if (tokenString) {
			navigate('/courses');
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
				<Route element={<PrivateRoute userRole='admin' />}>
					<Route path='/courses/add' element={<CourseForm />} />
					<Route path='/courses/update/:courseId' element={<CourseForm />} />
					<Route path='/courses/:courseId' element={<CourseInfo />} />
				</Route>
			</Routes>
		</div>
	);
}

export default App;
