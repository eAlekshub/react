import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './сourseForm.css';

import { BUTTON, PLACEHOLDER, LABEL, EMPTY_FIELDS } from '../../constants';

import { addAuthorThunk } from '../../store/authors/thunk';
import { updateCourseThunk, addCourseThunk } from '../../store/courses/thunk';
import { getAllAuthors, getAllCourses } from '../../store/selectors';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

const CreateCourse = () => {
	const {
		BUTTON_CREATE_COURSE,
		BUTTON_CREATE_AUTHOR,
		BUTTON_ADD_AUTHOR,
		BUTTON_DEL_AUTHOR,
		BUTTON_UPDATE_COURSE,
	} = BUTTON;

	const {
		PLACEHOLDER_TITLE,
		PLACEHOLDER_TEXTAREA,
		PLACEHOLDER_AUTHOR_NAME,
		PLACEHOLDER_DURATION,
	} = PLACEHOLDER;

	const { LABEL_TITLE, LABEL_DESCRIPTION, LABEL_AUTHOR_NAME, LABEL_DURATION } =
		LABEL;

	const [title, setTitle] = useState('');
	const [description, setDescription] = useState('');
	const [authorName, setAuthorName] = useState('');
	const [duration, setDuration] = useState('');
	const [authorsList, setAuthorsList] = useState([]);
	const [courseAuthorsList, setCourseAuthorsList] = useState([]);

	const navigate = useNavigate();
	const dispatch = useDispatch();
	const { courseId } = useParams();

	const allCourses = useSelector(getAllCourses);
	const allAuthors = useSelector(getAllAuthors);

	const handleTitleChange = (e) => {
		setTitle(e.target.value);
	};

	const handleDescriptionChange = (e) => {
		setDescription(e.target.value);
	};

	const handleAuthorNameChange = (e) => {
		setAuthorName(e.target.value);
	};

	const handleDurationChange = (e) => {
		e.target.value = e.target.value.replace(/\D/g, '');
		setDuration(e.target.value);
	};

	const handleAddAuthor = (author) => {
		setCourseAuthorsList([...courseAuthorsList, author]);
		setAuthorsList(authorsList.filter((a) => a.id !== author.id));
	};

	const handleRemoveAuthor = (author) => {
		setAuthorsList([...authorsList, author]);
		setCourseAuthorsList(courseAuthorsList.filter((a) => a.id !== author.id));
	};

	const handlCreateAuthor = () => {
		if (authorName.length >= 2) {
			const newAuthor = {
				name: authorName,
			};
			dispatch(addAuthorThunk(newAuthor));
			setAuthorName('');
		}
	};

	const nav = () => navigate('/courses');

	const updatedСourse = allCourses.find(({ id }) => id === courseId);

	const handleCreateCourse = (e) => {
		e.preventDefault();

		const today = new Date();
		const formattedDate = `${today.getDate()}/${
			today.getMonth() + 1
		}/${today.getFullYear()}`;

		const idCourseAuthorsList = courseAuthorsList.map((obj) => obj.id);
		const numDuration = Number(duration);

		if (
			title.length >= 2 &&
			description.length >= 2 &&
			duration.length >= 1 &&
			duration >= 1 &&
			courseAuthorsList.length !== 0
		) {
			const courseIndex = allCourses.findIndex(
				(course) => course.id === courseId
			);
			if (courseIndex !== -1) {
				const updatedCourse = {
					...allCourses[courseIndex],
					title: title,
					description: description,
					duration: numDuration,
					authors: idCourseAuthorsList,
				};
				dispatch(updateCourseThunk(updatedCourse, nav));
			} else {
				const newCourse = {
					title: title,
					description: description,
					creationDate: formattedDate,
					duration: numDuration,
					authors: idCourseAuthorsList,
				};
				dispatch(addCourseThunk(newCourse, nav));
			}
		} else {
			alert(EMPTY_FIELDS);
		}
	};

	useEffect(() => {
		setAuthorsList(allAuthors);

		if (updatedСourse) {
			setTitle(updatedСourse.title);
			setDescription(updatedСourse.description);
			setDuration(updatedСourse.duration.toString());
			setCourseAuthorsList(
				allAuthors.filter((author) => updatedСourse.authors.includes(author.id))
			);
			setAuthorsList(
				allAuthors.filter(
					(author) => !updatedСourse.authors.includes(author.id)
				)
			);
		}
	}, [allAuthors, updatedСourse]);

	return (
		<form className='formCreateCourse' onSubmit={handleCreateCourse}>
			<div className='formTitleBlock'>
				<Input
					htmlFor='title'
					inputId='title'
					inputType='text'
					labelText={LABEL_TITLE}
					placeholderText={PLACEHOLDER_TITLE}
					inputValue={title}
					onChangeInput={handleTitleChange}
				/>
				<Button
					type='submit'
					buttonText={
						updatedСourse ? BUTTON_UPDATE_COURSE : BUTTON_CREATE_COURSE
					}
				/>
			</div>

			<div className='formTextarea'>
				<label htmlFor='description'>{LABEL_DESCRIPTION}</label>
				<textarea
					id='description'
					name='description'
					placeholder={PLACEHOLDER_TEXTAREA}
					value={description}
					onChange={handleDescriptionChange}
				></textarea>
			</div>

			<div className='authorsBlock'>
				<div className='authorElement'>
					<h3>Add authors</h3>
					<Input
						htmlFor='authorName'
						inputId='authorName'
						inputType='text'
						labelText={LABEL_AUTHOR_NAME}
						placeholderText={PLACEHOLDER_AUTHOR_NAME}
						inputValue={authorName}
						onChangeInput={handleAuthorNameChange}
					/>
					<Button
						type='button'
						buttonText={BUTTON_CREATE_AUTHOR}
						onClick={handlCreateAuthor}
					/>
				</div>
				<div className='authorElement'>
					<h3>Authors</h3>
					<div className='authors'>
						{authorsList.map((author) => {
							return (
								<div className='authorName' key={author.id}>
									<p>{author.name}</p>
									<Button
										type='button'
										buttonText={BUTTON_ADD_AUTHOR}
										onClick={() => handleAddAuthor(author)}
									/>
								</div>
							);
						})}
					</div>
				</div>
				<div className='authorElement'>
					<h3>Duration</h3>
					<Input
						htmlFor='duration'
						inputId='duration'
						inputType='text'
						labelText={LABEL_DURATION}
						placeholderText={PLACEHOLDER_DURATION}
						inputValue={duration}
						onChangeInput={handleDurationChange}
					/>

					<p className='durationText'>
						Duration:{' '}
						<span>
							{duration > 0
								? new Date(duration * 60 * 1000).toISOString().substr(11, 5)
								: '00:00'}
						</span>{' '}
						hours
					</p>
				</div>
				<div className='authorElement'>
					<h3>Course autors</h3>
					<div className='courseAuthors'>
						{courseAuthorsList.length > 0 ? (
							courseAuthorsList.map((author) => (
								<div className='authorName' key={author.id}>
									<p>{author.name}</p>
									<Button
										buttonText={BUTTON_DEL_AUTHOR}
										onClick={() => handleRemoveAuthor(author)}
									/>
								</div>
							))
						) : (
							<p>Author list is empty</p>
						)}
					</div>
				</div>
			</div>
		</form>
	);
};

export default CreateCourse;
