'use strict';
import { operatorRest, operatorSpread } from './module/rest.js';

window.addEventListener('DOMContentLoaded', () => {



	operatorRest();
	operatorSpread();


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
	const modalCloseCross = document.querySelector('[data-close]');
	const modalTrigger = document.querySelectorAll('[data-modal]');


	function openModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = 'hidden';
		//если пользователь самостоятельно откроет модалку раньше чем произойдет автовызов, то автовызов мы отключаем
		clearInterval(modalTimerId);
	};

	function closeModal() {
		modal.classList.toggle('show');
		document.body.style.overflow = '';
	}

	modalTrigger.forEach(item => {
		item.addEventListener('click', openModal);
	});

	modalCloseCross.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		if (e.target === modal) {
			closeModal();
		}
	});

	document.addEventListener('keydown', (e) => {
		e.preventDefault();
		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal();
		}
	});

	//автовызов функции 
	const modalTimerId = setTimeout(openModal, 5000);

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

});