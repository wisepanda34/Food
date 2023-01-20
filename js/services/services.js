

//  функциональное выражение, отвечающее за отправку POST на сервер
const postData = async (url, data) => {
	//fetch  возвращает промис, который помещаем в переменную res
	const res = await fetch(url, {
		method: 'POST',
		headers: {
			'Content-type': 'application/json'
		},
		body: data
	});

	return await res.json();
};

// --- GET-запрос,
async function getResource(url) {

	const res = await fetch(url);
	if (!res.ok) {
		throw new Error(`Could not fetch ${url}, status: ${res.status}`);
	}
	return await res.json();
};

export { postData };
export { getResource };