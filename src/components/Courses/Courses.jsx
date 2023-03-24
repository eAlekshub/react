import React, { useEffect, useState, useCallback } from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './courses.css';

import {
	mockedCoursesList,
	mockedAuthorsList,
	BUTTON,
	PLACEHOLDER,
} from '../../constants';
import { GET_COURSES } from '../../store/courses/actionTypes';
import { GET_AUTHORS } from '../../store/authors/actionTypes';

import { getData } from '../../servisces';

import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';

const Courses = () => {
	const { BUTTON_NEW_COURSE } = BUTTON;
	const { PLACEHOLDER_SEARCH } = PLACEHOLDER;

	const [searchValue, setSearchValue] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([]);

	const allCourses = useSelector((state) => state.courses);
	const allAuthors = useSelector((state) => state.authors);
	const dispatch = useDispatch();

	const getAllCourses = useCallback(
		(course) => {
			dispatch({
				type: GET_COURSES,
				payload: course,
			});
		},
		[dispatch]
	);

	const getAllAuthors = useCallback(
		(authors) => {
			dispatch({
				type: GET_AUTHORS,
				payload: authors,
			});
		},
		[dispatch]
	);

	const handleSearch = () => {
		const searchValueLowerCase = searchValue.toLowerCase();
		const filtered = allCourses.filter((course) => {
			const idString = course.id.toString().toLowerCase();
			const titleString = course.title.toLowerCase();

			return (
				idString.includes(searchValueLowerCase) ||
				titleString.includes(searchValueLowerCase)
			);
		});
		setFilteredCourses(filtered);
	};

	useEffect(() => {
		getData('http://localhost:4000/courses/all')
			.then((data) => {
				getAllCourses(data.result);
			})
			.catch((error) => {
				throw new Error(error);
			});

		getData('http://localhost:4000/authors/all')
			.then((data) => {
				getAllAuthors(data.result);
			})
			.catch((error) => {
				throw new Error(error);
			});

		if (searchValue === '') {
			setFilteredCourses(allCourses);
		}
	}, [allCourses, getAllAuthors, getAllCourses, searchValue]);

	return (
		<section className='coursesList'>
			<div className='controlPanel'>
				<>
					<SearchBar
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onSearch={handleSearch}
						placeholder={PLACEHOLDER_SEARCH}
					/>
					<Link to='/courses/add'>
						<Button buttonText={BUTTON_NEW_COURSE} />
					</Link>
				</>
			</div>

			{filteredCourses.map((course) => {
				const courseAuthors = allAuthors
					.filter((author) => course.authors.includes(author.id))
					.map((author) => author.name)
					.join(', ');

				const time = `${new Date(course.duration * 60 * 1000)
					.toISOString()
					.substr(11, 5)} hours`;

				return (
					<CourseCard
						key={course.id}
						{...course}
						authors={courseAuthors}
						duration={time}
					/>
				);
			})}
		</section>
	);
};

export default Courses;
