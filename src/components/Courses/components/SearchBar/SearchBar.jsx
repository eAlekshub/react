import React from 'react';
import './searchBar.css';

import { BUTTON } from '../../../../constants';

import Input from '../../../../common/Input/Input';
import Button from '../../../../common/Button/Button';

const SearchBar = ({ value, onChange, onSearch, placeholder }) => {
	const { BUTTON_SEARCH } = BUTTON;

	return (
		<div className='searchBar'>
			<Input
				inputValue={value}
				onChangeInput={onChange}
				placeholderText={placeholder}
			/>
			<Button onClick={onSearch} buttonText={BUTTON_SEARCH} />
		</div>
	);
};

export default SearchBar;
