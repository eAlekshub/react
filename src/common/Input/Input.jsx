import React from 'react';
import './input.css';

const Input = (props) => {
	const {
		labelText,
		placeholderText,
		onChangeInput,
		inputType,
		inputId,
		inputValue,
		htmlFor,
	} = props;

	return (
		<div className='searchInput'>
			<label htmlFor={htmlFor}>{labelText}</label>
			<input
				type={inputType}
				id={inputId}
				placeholder={placeholderText}
				value={inputValue}
				onChange={onChangeInput}
			></input>
		</div>
	);
};

export default Input;
