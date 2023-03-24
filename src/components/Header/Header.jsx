import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { LOGOUT } from '../../store/user/actionTypes';

import './header.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector((state) => state.user);

	const logout = () => {
		dispatch({ type: LOGOUT, payload: user });
		localStorage.removeItem('token');
	};

	return (
		<header>
			<Logo />
			{user.isAuth ? (
				<div className='userBox'>
					<p className='userName'>{user.name}</p>
					<Link to={'/login'}>
						<Button buttonText='Logout' onClick={logout} />
					</Link>
				</div>
			) : (
				<div className='userBox'></div>
			)}
		</header>
	);
};

export default Header;
