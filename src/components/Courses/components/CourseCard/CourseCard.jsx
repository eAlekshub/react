import React from 'react';
import { Link } from 'react-router-dom';

import './courseCard.css';

import Button from '../../../../common/Button/Button';

import { BUTTON } from '../../../../constants';

const CourseCard = (course) => {
	const { id, title, description, duration, creationDate, authors } = course;
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
				<Link to={`/courses/${id}`}>
					<Button buttonText={BUTTON_SHOW_COURSE} />
				</Link>
			</div>
		</div>
	);
};

export default CourseCard;
