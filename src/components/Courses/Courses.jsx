import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import './courses.css';

import {
	mockedCoursesList,
	mockedAuthorsList,
	BUTTON,
	PLACEHOLDER,
} from '../../constants';

import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';

const Courses = () => {
	const { BUTTON_NEW_COURSE } = BUTTON;
	const { PLACEHOLDER_SEARCH } = PLACEHOLDER;

	const [searchValue, setSearchValue] = useState('');
	const [filteredCourses, setFilteredCourses] = useState(mockedCoursesList);

	const handleSearch = () => {
		const searchValueLowerCase = searchValue.toLowerCase();
		const filtered = mockedCoursesList.filter((course) => {
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
		if (searchValue === '') {
			setFilteredCourses(mockedCoursesList);
		}
	}, [searchValue]);

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
				const courseAuthors = mockedAuthorsList
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
