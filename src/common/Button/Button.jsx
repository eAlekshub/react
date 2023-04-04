import React from 'react';
import './button.css';

const Button = ({
	className,
	type,
	buttonText,
	onClick,
	srcImage,
	altText,
}) => {
	return (
		<button className={className} type={type} onClick={onClick}>
			{srcImage ? <img src={srcImage} alt={altText} /> : null}
			{buttonText}
		</button>
	);
};

export default Button;
