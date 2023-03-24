const getData = async (url, token) => {
	const response = await fetch(url, {
		method: 'GET',
		headers: {
			Authorization: token,
			'Content-Type': 'application/json',
		},
	});
	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data);
	}
};

export { getData };
