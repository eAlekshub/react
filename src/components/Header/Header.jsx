import React from 'react';
import { Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';

import './header.css';

import { logout } from '../../store/user/actionCreators';
import { getUser } from '../../store/selectors';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const dispatch = useDispatch();
	const user = useSelector(getUser);

	const handleLogout = () => {
		localStorage.removeItem('token');
		dispatch(logout(user));
	};

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
