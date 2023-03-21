import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './registration.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { BUTTON } from '../../constants';

import { registrationForm } from '../../constants';

const Registration = () => {
	const navigate = useNavigate();
	const { BUTTON_REGISTRATION } = BUTTON;
	const [newUser, setNewUser] = useState({});

	async function registerUser(user) {
		const response = await fetch('http://localhost:4000/register', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const result = await response.json();

		if (response.ok) {
			console.log('Success:', result);
			navigate('/login');
		} else {
			alert('Registration error');
			console.error('Error:', result);
		}
	}

	const handleInputChange = (newValue) => {
		setNewUser({ ...newUser, ...newValue });
	};

	const handlRegistration = (e) => {
		e.preventDefault();
		registerUser(newUser);
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
