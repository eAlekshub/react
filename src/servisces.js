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

const postData = async (user, url) => {
	const response = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify(user),
	});

	const data = await response.json();

	if (response.ok) {
		return data;
	} else {
		throw new Error(data);
	}
};

export { getData, postData };
