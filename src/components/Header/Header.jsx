import React, { useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';

import { useDispatch, useSelector } from 'react-redux';
import { getUserThunk, delUserThunk } from '../../store/user/thunk';

import './header.css';

import { getUser } from '../../store/selectors';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const navigate = useNavigate();

	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(delUserThunk());
	};

	useEffect(() => {
		const tokenString = localStorage.getItem('token');
		if (tokenString) {
			const token = JSON.parse(tokenString);
			dispatch(getUserThunk('http://localhost:4000/users/me', token));
		}
	}, [dispatch, navigate]);

	return (
		<header>
			<Logo />
			{user.isAuth ? (
				<div className='userBox'>
					<p className='userName'>{user.name}</p>
					<Link to={'/login'}>
						<Button buttonText='Logout' onClick={handleLogout} />
					</Link>
				</div>
			) : (
				<div className='userBox'></div>
			)}
		</header>
	);
};

export default Header;
