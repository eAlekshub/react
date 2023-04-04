import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './courseCard.css';
import pencil from '../../../../../src/img/pencil.svg';
import trash from '../../../../../src/img/trash.svg';

import { delCourseThunk } from '../../../../store/courses/thunk';
import { getUser } from '../../../../store/selectors';
import { BUTTON } from '../../../../constants';

import Button from '../../../../common/Button/Button';

const CourseCard = ({
	id,
	title,
	description,
	duration,
	creationDate,
	authors,
}) => {
	const { BUTTON_SHOW_COURSE } = BUTTON;

	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const handleDeleteClick = () => {
		dispatch(delCourseThunk(id));
	};

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
				<div className='controlPanel'>
					<Link to={`/courses/${id}`}>
						<Button buttonText={BUTTON_SHOW_COURSE} />
					</Link>
					{user.role === 'admin' && (
						<>
							<Link to={`/courses/update/${id}`}>
								<Button
									className='controlBtn'
									type='button'
									srcImage={pencil}
									alt='button update'
									// onClick={() => console.log('Button clicked')}
								/>
							</Link>
							<Button
								className='controlBtn'
								type='button'
								srcImage={trash}
								alt='button delete'
								onClick={handleDeleteClick}
							/>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default CourseCard;
