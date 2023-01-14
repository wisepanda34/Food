'use strict';
import { requestFile } from './module/clone.js';
import { operatorRest, operatorSpread } from './module/rest.js';


window.addEventListener('DOMContentLoaded', () => {



	// operatorRest();
	// operatorSpread();
	// requestFile();


	//=========TABS====================================================
	const tabs = document.querySelectorAll('.tabheader__item');
	const tabParent = document.querySelector('.tabheader__items');
	const tabsContent = document.querySelectorAll('.tabcontent');

	function hideTabsContent() {
		tabs.forEach(item => {
			item.classList.remove('tabheader__item_active');
		});

		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');

		});
	}

	function showTabsContemt(i = 0) {
		tabs[i].classList.add('tabheader__item_active');
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
	}

	tabParent.addEventListener('click', (e) => {
		e.preventDefault();
		if (e.target && e.target.classList.contains('tabheader__item')) {
			tabs.forEach((item, i) => {
				if (e.target == item) {
					hideTabsContent();
					showTabsContemt(i);
				}
			});
		}
	});

	hideTabsContent();
	showTabsContemt();

	//======================TIMER====================================

	//1)дата окончания акции
	const deadline = '2023-01-15';

	//2)функция вычисления сколько осталось милисекунд и разложение на дни, часы, минуты, секунды
	function getTimeRemaining(endtime) {

		const t = Date.parse(endtime) - Date.parse(new Date());
		const days = Math.floor(t / (1000 * 60 * 60 * 24));
		const hours = Math.floor((t / (1000 * 60 * 60)) % 24);
		const minuts = Math.floor((t / 1000 / 60) % 60);
		const seconds = Math.floor((t / 1000) % 60);

		return {
			'total': t,
			'days': days,
			'hours': hours,
			'minuts': minuts,
			'seconds': seconds
		};
	}
	//5)функция помощник проверки на односимвольное число и возрат если нужно с нулем впереди
	function getZero(num) {
		if (num >= 0 && num < 10) {
			return `0${num}`;
		} else {
			return num;
		}
	}
	//3)функция связывания коллекции по клаасу и #id, запуск setInterval
	function setClock(selector, endtime) {
		const timer = document.querySelector(selector),
			days = timer.querySelector('#days'),
			hours = timer.querySelector('#hours'),
			minuts = timer.querySelector('#minutes'),
			seconds = timer.querySelector('#seconds'),
			timeInterval = setInterval(updateClock, 1000);

		//для мгновенного обновления даты на сайте вызываем функцию updateClock() сразу при загрузке страницы
		updateClock();

		//4)функция обновления данных остатка времени на сайте: запрос на функцию вычисления с аргументом конечного времени, присваивание возвращенных данных с предварительной проверкой функцией-помощником, проверка на окончание отсчета и прерывание таймера
		function updateClock() {
			const t = getTimeRemaining(endtime);

			days.innerHTML = getZero(t.days);
			hours.innerHTML = getZero(t.hours);
			minuts.innerHTML = getZero(t.minuts);
			seconds.innerHTML = getZero(t.seconds);


			if (t.total <= 0) {
				clearInterval(timeInterval);
			}
		}
	}
	//6)вызов функции с передачей аргументов: переменная класса родителя даты на сайте и deadline(конечная дата отсчета)
	setClock('.timer', deadline);


	//===============================  MODAL  =======================================

	const modal = document.querySelector('.modal');
	const modalTrigger = document.querySelectorAll('[data-modal]');
	// const modalCloseCross = document.querySelector('[data-close]');//убираем т.к. это не работает с динамическим объектом закрытия


	function openModal() {
		modal.classList.add('show');
		document.body.style.overflow = 'hidden';
		//если пользователь самостоятельно откроет модалку раньше чем произойдет автовызов, то автовызов мы отключаем
		clearInterval(modalTimerId);
	};

	function closeModal() {
		modal.classList.remove('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});

	// modalCloseCross.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		//добавляем в условие клик по любому объекту с атрибутом 'data-close' в том числе и динамические
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {

		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();

		}
	});

	//автовызов функции 
	const modalTimerId = setTimeout(openModal, 50000);

	function modalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();

			//для предупреждения повторного открытия модалки при концевом скроллинге
			window.removeEventListener('scroll', modalByScroll);
		}
	}

	//настойка автовызова модалки при проскролле до низа сайта
	window.addEventListener('scroll', modalByScroll);


	//===========  class  ====================================================


	class MenuCard {
		constructor(src, alt, title, descr, price, parentSelector, ...classes) {
			this.src = src;
			this.alt = alt;
			this.title = title;
			this.descr = descr;
			this.price = price;
			this.parent = document.querySelector(parentSelector);
			this.classes = classes;
			this.transfer = 27;
			this.changeToUAH();
		}
		changeToUAH() {
			this.price = +this.price * +this.transfer;
		}
		render() {
			const element = document.createElement('div');
			if (this.classes.length === 0) {
				element.classList.add('menu__item');
			} else {
				this.classes.forEach(className => element.classList.add(className));
			}

			element.innerHTML = `
				<img src=${this.src} alt=${this.alt}>
				<h3 class="menu__item-subtitle">${this.title}</h3>
				<div class="menu__item-descr">${this.descr}</div>
				<div class="menu__item-divider"></div>
				<div class="menu__item-price">
						<div class="menu__item-cost">Цена:</div>
						<div class="menu__item-total"><span>${this.price}</span> грн/день</div>  
				</div>
			`;

			this.parent.append(element);
		}
	}


	// const div=new MenuCard();
	// div.render();

	new MenuCard(
		"img/tabs/vegy.jpg",
		"vegy",
		'Меню "Фитнес"',
		'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!',
		9,
		'.menu .container',
		// 'menu__item',
		// 'big'
	).render();

	new MenuCard(
		"img/tabs/elite.jpg",
		"elite",
		'Меню “Премиум”',
		'В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
		9,
		'.menu .container',
		// 'menu__item'
	).render();

	new MenuCard(
		"img/tabs/post.jpg",
		"post",
		'Меню "Постное"',
		'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.',
		9,
		'.menu .container',
		// 'menu__item'
	).render();

	//============= FORMS ====================
	//------отправка 'POST'-запроса на сервер  ---  

	const forms = document.querySelectorAll('form');
	const message = {
		// loading: 'Loading',
		loading: 'img/spinner/spinner.svg',
		succes: 'Thank you, we call you soon!',
		failure: 'Something went wrong...'
	};

	forms.forEach(item => {
		postData(item);
	});

	function postData(form) {
		form.addEventListener('submit', (e) => {
			e.preventDefault();

			const statusMessage = document.createElement('img');
			// statusMessage.classList.add('status');
			// statusMessage.textContent = message.loading;
			statusMessage.src = message.loading;
			statusMessage.style.cssText = `
						display: block;
						margin: 0 auto; 
			`;

			// form.append(statusMessage);
			//Вставим сообщение за формой
			form.insertAdjacentElement('afterend', statusMessage)

			const request = new XMLHttpRequest();//это встроенный в браузер объект, который даёт возможность делать HTTP-запросы к серверу без перезагрузки страницы
			request.open('POST', 'server.php');

			//второй аргумент отвечает за формат отправляемого запроса, зависит от того, в каком формате принимает запросы бекэнд
			// request.setRequestHeader('Content-type', 'multipart/form-data');
			request.setRequestHeader('Content-type', 'application/json');

			//критически важно чтобы в инпутах были прописаны атребуты 'name', по ним будет произведен поиск 
			const formData = new FormData(form);//это объект, представляющий данные HTML формы

			//для отправки в json-формате перобразовуем FormData-объект в JSON-объект,
			// также необходимо в php-файле прописать код по декодированию JSON-данных
			const object = {};
			formData.forEach((value, key) => {
				object[key] = value;
			});
			const json = JSON.stringify(object);


			// request.send(formData);
			request.send(json);

			request.addEventListener('load', () => {
				if (request.status === 200) {
					console.log(request.response);
					showThanksModal(message.succes);
					form.reset();
					statusMessage.remove();

				} else {
					showThanksModal(message.failure);
				}
			});
		});
	};

	function showThanksModal(message) {

		const prevModalDialog = document.querySelector('.modal__dialog');

		prevModalDialog.classList.add('hide');
		openModal();

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
			closeModal();

		}, 2000);

	};


});