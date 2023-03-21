import React from 'react';
import { Link } from 'react-router-dom';

import './header.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const resultString = localStorage.getItem('result');
	const result = JSON.parse(resultString);

	const logout = () => {
		localStorage.removeItem('result');
	};

	return (
		<header>
			<Logo />
			{resultString !== null ? (
				<div className='userBox'>
					<p className='userName'>{result.user.name}</p>
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
