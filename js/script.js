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

	function showTabsContent(i = 0) {
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
					showTabsContent(i);
				}
			});
		}
	});

	hideTabsContent();
	showTabsContent();

	//======================TIMER====================================

	//1)дата окончания акции
	const deadline = '2023-02-15';

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

			//добавление нуля к однозначным числам
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

	//функция вызова модального окна при досклолливании до низа сайта
	function modalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal();

			//для предупреждения повторного открытия модального окна при концевом скроллинге
			window.removeEventListener('scroll', modalByScroll);
		}
	}

	// автовызов модального окна при проскролле до низа сайта
	window.addEventListener('scroll', modalByScroll);


	//===========  class  ====================================================
	// --- GET-запрос,
	const getResource = async (url) => {

		const res = await fetch(url);
		if (!res.ok) {
			throw new Error(`Could not fetch ${url}, status: ${res.status}`);
		}
		return await res.json();
	};


	getResource('http://localhost:3000/menu')
		.then(data => createCard(data));


	//функция динамического создание элементов с данными от сервера
	function createCard(data) {
		data.forEach(({ img, altimg, title, descr, price }) => {
			const element = document.createElement('div');

			element.classList.add('menu__item');

			element.innerHTML = `
			<img src=${img} alt=${altimg}>
			<h3 class="menu__item-subtitle">${title}</h3>
			<div class="menu__item-descr">${descr}</div>
			<div class="menu__item-divider"></div>
			<div class="menu__item-price">
					<div class="menu__item-cost">Цена:</div>
					<div class="menu__item-total"><span>${price}</span> грн/день</div>  
			</div>
				`;
			document.querySelector('.menu .container').append(element);
		});
	};
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
			method: "POST",
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

	//================  SLIDER  =============================

	const slides = document.querySelectorAll('.offer__slide');
	const slider = document.querySelector('.offer__slider');
	const prev = document.querySelector('.offer__slider-prev');
	const next = document.querySelector('.offer__slider-next');
	const total = document.querySelector('#total');
	const current = document.querySelector('#current');
	const slidesWrapper = document.querySelector('.offer__slider-wrapper');
	const slidesField = document.querySelector('.offer__slider-inner');
	const width = window.getComputedStyle(slidesWrapper).width;
	let slideIndex = 1;
	let offset = 0;


	slidesField.style.width = 100 * slides.length + '%';
	slidesField.style.display = 'flex';
	slidesField.style.transition = '0.5s all';
	slidesWrapper.style.overflow = 'hidden';
	slides.forEach(slide => {
		slide.style.width = width;
	});
	slider.style.position = 'relative';

	const indicators = document.createElement('ol');
	const dots = [];


	indicators.classList.add('carousel-indicators');
	indicators.style.cssText = `
			position: absolute;
			right: 0;
			bottom: 0;
			left: 0;
			z-index: 15;
			display: flex;
			justify-content: center;
			margin-right: 15%;
			margin-left: 15%;
			list-style: none;
	`;

	slider.append(indicators);

	for (let i = 0; i < slides.length; i++) {
		const dot = document.createElement('li');
		dot.setAttribute('data-slide-to', i + 1);
		dot.style.cssText = `
				box-sizing: content-box;
				flex: 0 1 auto;
				width: 30px;
				height: 10px;
				margin-right: 3px;
				margin-left: 3px;
				cursor: pointer;
				background-color: #fff;
				background-clip: padding-box;
				border-top: 10px solid transparent;
				border-bottom: 10px solid transparent;
				opacity: .5;
				transition: opacity .6s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	//проверка и добавления нуля к однозначным числам
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
		current.textContent = `0${slideIndex}`;
	} else {
		total.textContent = slides.length;
		current.textContent = slideIndex;
	}

	next.addEventListener('click', () => {
		if (offset == +width.slice(0, width.length - 2) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		}
		else {
			slideIndex++;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';


	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = +width.slice(0, width.length - 2) * (slides.length - 1);
		} else {
			offset -= +width.slice(0, width.length - 2);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		}
		else {
			slideIndex--;
		}

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	});

	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = +width.slice(0, width.length - 2) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			if (slides.length < 10) {
				current.textContent = `0${slideIndex}`;
			} else {
				current.textContent = slideIndex;
			}

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = '1';
		});
	})


	// ---- simple slider way ---------

	/* 
	showSlides(slideIndex);

	//проверка и добавления нуля к однозначным числам
	if (slides.length < 10) {
		total.textContent = `0${slides.length}`;
	} else {
		total.textContent = slides.length;
	}

	function showSlides(n) {
		if (n > slides.length) {
			slideIndex = 1;
		}
		if (n < 1) {
			slideIndex = slides.length
		}

		slides.forEach(item => item.style.display = 'none');

		slides[slideIndex - 1].style.display = 'block';

		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}

	function plusSlides(n) {
		showSlides(slideIndex += n);
	}

	prev.addEventListener('click', () => {
		plusSlides(-1);
	})

	next.addEventListener('click', () => {
		plusSlides(1);
	})
 */

});