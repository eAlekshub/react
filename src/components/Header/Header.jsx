import React from 'react';
import './header.css';

import Logo from './components/Logo/Logo';
import Button from '../../common/Button/Button';

const Header = () => {
	const handleClick = () => {
		console.log('Button clicked');
	};

	return (
		<header>
			<Logo />
			<div className='userBox'>
				<p className='userName'>Dave</p>
				<Button buttonText='Logout' onClick={handleClick} />
			</div>
		</header>
	);
};

export default Header;
