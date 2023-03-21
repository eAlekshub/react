import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import './login.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { BUTTON } from '../../constants';

import { loginForm } from '../../constants';

const Login = () => {
	const navigate = useNavigate();
	const { BUTTON_LOGIN } = BUTTON;
	const [user, setUser] = useState({});

	async function loginUser(user) {
		const response = await fetch('http://localhost:4000/login', {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify(user),
		});

		const result = await response.json();

		if (response.ok) {
			console.log('Success:', result);
			localStorage.setItem('result', JSON.stringify(result));
			navigate('/courses');
		} else {
			alert('Authorisation error');
			console.error('Error:', result);
		}
	}

	const handleInputChange = (newValue) => {
		setUser({ ...user, ...newValue });
	};

	const handlLogin = (e) => {
		e.preventDefault();
		loginUser(user);
	};

	return (
		<section className='login'>
			<form className='formLogin' action='' onSubmit={handlLogin}>
				<h2>Login</h2>
				<div className='inpuLogin'>
					{loginForm.map((input) => {
						return (
							<Input
								key={input.inputId}
								{...input}
								inputValue={user[input.inputId] || ''}
								onChangeInput={(e) =>
									handleInputChange({ [input.inputId]: e.target.value })
								}
							/>
						);
					})}
				</div>
				<Button type='submit' buttonText={BUTTON_LOGIN} />
			</form>
			<p>
				If you not have an account you can{' '}
				<Link className='loginLink' to={'/registration'}>
					Registration
				</Link>
			</p>
		</section>
	);
};

export default Login;
