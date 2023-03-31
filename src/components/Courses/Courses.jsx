import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

import './courses.css';

import { getAllCourses, getAllAuthors, getUser } from '../../store/selectors';
import { BUTTON, PLACEHOLDER } from '../../constants';

import SearchBar from './components/SearchBar/SearchBar';
import Button from '../../common/Button/Button';
import CourseCard from './components/CourseCard/CourseCard';

const Courses = () => {
	const { BUTTON_NEW_COURSE } = BUTTON;
	const { PLACEHOLDER_SEARCH } = PLACEHOLDER;

	const [searchValue, setSearchValue] = useState('');
	const [filteredCourses, setFilteredCourses] = useState([]);

	const user = useSelector(getUser);

	const allCourses = useSelector(getAllCourses);
	const allAuthors = useSelector(getAllAuthors);

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
		if (searchValue === '') {
			setFilteredCourses(allCourses);
		}
	}, [allCourses, searchValue]);

	return (
		<section className='coursesList'>
			<div className='courseControls'>
				<>
					<SearchBar
						value={searchValue}
						onChange={(e) => setSearchValue(e.target.value)}
						onSearch={handleSearch}
						placeholder={PLACEHOLDER_SEARCH}
					/>
					{user.role === 'admin' && (
						<Link to='/courses/add'>
							<Button buttonText={BUTTON_NEW_COURSE} />
						</Link>
					)}
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
