import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';

import './login.css';

import Input from '../../common/Input/Input';
import Button from '../../common/Button/Button';

import { BUTTON, loginForm } from '../../constants';
import { loginUserThunk } from '../../store/user/thunk';

const Login = () => {
	const { BUTTON_LOGIN } = BUTTON;
	const [user, setUser] = useState({});
	const navigate = useNavigate();
	const dispatch = useDispatch();

	const handleInputChange = (newValue) => {
		setUser({ ...user, ...newValue });
	};

	const nav = () => {
		navigate('/courses');
	};

	const handlLogin = (e) => {
		e.preventDefault();
		dispatch(loginUserThunk(user, nav));
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
