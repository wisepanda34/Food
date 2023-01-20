import { openModal } from './modal.js';
import { closeModal } from './modal.js';

function forms(modalTimerId) {

	//============= FORMS ====================
	//------отправка 'POST'-запроса на сервер  ---  

	const forms = document.querySelectorAll('form');

	//объект с информированием пользователя  о процессах
	const message = {
		loading: 'img/spinner/spinner.svg',
		success: 'Thank you, we call you soon!',
		failure: 'Something went wrong...'
	};

	forms.forEach(item => {
		bindPostData(item);
	});

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

	//функция отвечает за привязку постинга
	function bindPostData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			//создание и вывод спиннера ожидания запроса
			const statusMessage = document.createElement('img');
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto; 
			`;

			//это объект, представляющий данные HTML формы
			const formData = new FormData(form);

			//преобразование FormData до json-объекта
			const json = JSON.stringify(Object.fromEntries(formData.entries()));

			//вызов функции отправки пост-запроса с последующей его обработкой 
			postData('http://localhost:3000/requests', JSON.stringify(json))
				.then(data => {
					console.log(data);
					showThanksModal(message.success);

					statusMessage.remove();
				})
				.catch(() => {
					showThanksModal(message.failure);
				}).finally(() => {
					form.reset();
				});

		});
	};


	//функция вывода информирования пользователя о статусе пост-запроса
	function showThanksModal(message) {

		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal('.modal', modalTimerId);

		const thanksModal = document.createElement('div');
		thanksModal.classList.add('modal__dialog');
		thanksModal.innerHTML = `
		<div class="modal__content"> 
			<div class="modal__close" data-close>×</div>
			<div class="modal__title">${message} </div> 
		</div>  
		`;

		document.querySelector('.modal').append(thanksModal);

		setTimeout(() => {
			thanksModal.remove();
			prevModalDialog.classList.add('show');
			prevModalDialog.classList.remove('hide');
			closeModal('.modal');

		}, 2000);

	};


}

export default forms;