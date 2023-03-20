import React from 'react';
import './button.css';

const Button = (props) => {
	const { type, buttonText, onClick } = props;
	return (
		<button type={type} onClick={onClick}>
			{buttonText}
		</button>
	);
};

export default Button;
