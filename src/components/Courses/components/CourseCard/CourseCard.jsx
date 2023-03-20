import React from 'react';

import './courseCard.css';

import Button from '../../../../common/Button/Button';

import { BUTTON } from '../../../../constants';

const CourseCard = (course) => {
	const { title, description, duration, creationDate, showCourse, authors } =
		course;
	const { BUTTON_SHOW_COURSE } = BUTTON;

	return (
		<div className='courseCard'>
			<div className='courseTitle'>
				<h2>{title}</h2>
				<p>{description}</p>
			</div>
			<div className='courseDescription'>
				<p className='author'>
					<b>Author:</b> {authors}
				</p>
				<p>
					<b>Duration:</b> {duration}
				</p>
				<p>
					<b>Created:</b> {creationDate}
				</p>
				<Button
					buttonText={BUTTON_SHOW_COURSE}
					onClick={() => showCourse(course)}
				/>
			</div>
		</div>
	);
};

export default CourseCard;
