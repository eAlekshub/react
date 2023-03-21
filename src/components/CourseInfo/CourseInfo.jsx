import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';

import './courseInfo.css';
import { mockedCoursesList, mockedAuthorsList, BUTTON } from '../../constants';

import Button from '../../common/Button/Button';

const CourseInfo = () => {
	const { courseId } = useParams();
	const navigate = useNavigate();

	const { BUTTON_BACK } = BUTTON;

	const goBack = () => {
		navigate(-1);
	};

	const course = mockedCoursesList.find((course) => course.id === courseId);

	const courseAuthors = mockedAuthorsList
		.filter((author) => course.authors.includes(author.id))
		.map((author) => author.name)
		.join(', ');

	const time = `${new Date(course.duration * 60 * 1000)
		.toISOString()
		.substr(11, 5)} hours`;

	return (
		<div className='courseInfo'>
			<Button buttonText={BUTTON_BACK} onClick={goBack} />
			<h2>{course.title}</h2>
			<div className='description'>
				<p className='descriptionText'>{course.description}</p>
				<div className='courseId'>
					<p>
						<b>ID:</b> {course.id}
					</p>
					<p>
						<b>Duration:</b> {time}
					</p>
					<p>
						<b>Created:</b> {course.creationDate}
					</p>
					<p>
						<b>Authors:</b> {courseAuthors}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CourseInfo;
