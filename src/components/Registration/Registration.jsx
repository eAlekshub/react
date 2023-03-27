import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './registration.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { BUTTON, registrationForm } from '../../constants';

import { postData } from '../../servisces';

const Registration = () => {
	const navigate = useNavigate();
	const { BUTTON_REGISTRATION } = BUTTON;
	const [newUser, setNewUser] = useState({});

	const handleInputChange = (newValue) => {
		setNewUser({ ...newUser, ...newValue });
	};

	const handlRegistration = (e) => {
		e.preventDefault();
		postData(newUser, 'http://localhost:4000/register')
			.then((data) => {
				console.log('Success:', data);
				navigate('/login');
			})
			.catch((error) => {
				alert('Registration error');
				throw new Error(error);
			});
	};

	return (
		<section className='registration'>
			<form className='formRegistration' onSubmit={handlRegistration}>
				<h2>Registration</h2>
				<div className='inpuRegistration'>
					{registrationForm.map((input) => {
						return (
							<Input
								key={input.inputId}
								{...input}
								inputValue={newUser[input.inputId] || ''}
								onChangeInput={(e) =>
									handleInputChange({ [input.inputId]: e.target.value })
								}
							/>
						);
					})}
				</div>
				<Button type='submit' buttonText={BUTTON_REGISTRATION} />
			</form>
			<p>
				If you have an account you can{' '}
				<Link className='registrationLink' to={'/login'}>
					Login
				</Link>
			</p>
		</section>
	);
};

export default Registration;
