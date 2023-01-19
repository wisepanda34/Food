/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
/******/ 	var __webpack_modules__ = ({

/***/ "./js/modules/calc.js":
/*!****************************!*\
  !*** ./js/modules/calc.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function calc() {

	// ==============  Calc  =======================
	const result = document.querySelector('.calculating__result span');
	let sex, weight, height, age, ratio;

	if (localStorage.getItem('sex')) {
		sex = localStorage.getItem('sex');
	} else {
		sex = 'female';
		localStorage.setItem('sex', 'female');
	}

	if (localStorage.getItem('ratio')) {
		ratio = localStorage.getItem('ratio');
	} else {
		ratio = 1.375;
		localStorage.setItem('retio', 1.375);
	}

	function initLocalSettings(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.classList.remove(activeClass);
			if (elem.getAttribute('id') === localStorage.getItem('sex')) {
				elem.classList.add(activeClass);
			}
			if (elem.getAttribute('data-ratio') === localStorage.getItem('ratio')) {
				elem.classList.add(activeClass);
			}
		})
	}

	initLocalSettings('#gender div', 'calculating__choose-item_active');
	initLocalSettings('.calculating__choose_big div', 'calculating__choose-item_active');



	function calcTotal() {
		if (!sex || !weight || !height || !age || !ratio) {
			result.textContent = 'input all fields!';
			return;
		} else if (sex === 'female') {
			result.textContent = Math.round((447.6 + (9.2 * weight) + (3.1 * height) - (4.3 * age)) * ratio);
		} else {
			result.textContent = Math.round((88.36 + (13.4 * weight) + (4.8 * height) - (5.7 * age)) * ratio);
		}
	}
	calcTotal();

	function getStaticInformation(selector, activeClass) {
		const elements = document.querySelectorAll(selector);

		elements.forEach(elem => {
			elem.addEventListener('click', (e) => {

				if (e.target.getAttribute('data-ratio')) {
					ratio = +e.target.getAttribute('data-ratio');

					//ложим в память браузера выбранные пользователем параметры
					localStorage.setItem('ratio', +e.target.getAttribute('data-ratio'));
				} else {
					sex = e.target.getAttribute('id');
					localStorage.setItem('sex', e.target.getAttribute('id'));
				}

				calcTotal();

				elements.forEach(item => {
					item.classList.remove(activeClass);
				})
				e.target.classList.add(activeClass);
			})
		})
	}

	getStaticInformation('#gender div', 'calculating__choose-item_active');
	getStaticInformation('.calculating__choose_big div', 'calculating__choose-item_active');

	function getDynamicInformation(selector) {

		const input = document.querySelector(selector);

		input.addEventListener('input', () => {

			// ПРОВЕРКА НА НЕ ЧИСЛА	
			if (input.value.match(/\D/)) {
				input.style.border = '1px solid red';
			} else {
				input.style.border = 'none';
			}

			switch (input.getAttribute('id')) {
				case 'height':
					height = +input.value;
					break;
				case 'weight':
					weight = +input.value;
					break;
				case 'age':
					age = +input.value;
					break;
			}
			calcTotal();
		});
	}
	getDynamicInformation('#height');
	getDynamicInformation('#weight');
	getDynamicInformation('#age');


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (calc);

/***/ }),

/***/ "./js/modules/cards.js":
/*!*****************************!*\
  !*** ./js/modules/cards.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function cards() {

	//===========  class for cards ====================================================
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

}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (cards);

/***/ }),

/***/ "./js/modules/clone.js":
/*!*****************************!*\
  !*** ./js/modules/clone.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "requestFile": () => (/* binding */ requestFile)
/* harmony export */ });

const requestCode = {

	requestFile: function () {

		const persone = {
			name: 'Alex',
			tel: '+74444444',
			parent: {
				mom: 'Olga',
				dad: 'Mike'
			}
		}

		const clonePersone = JSON.parse(JSON.stringify(persone));
		clonePersone.parent.mom = 'Ann';
		console.log(persone);
		console.log(clonePersone);



	}

};
const requestFile = requestCode.requestFile;

/***/ }),

/***/ "./js/modules/modal.js":
/*!*****************************!*\
  !*** ./js/modules/modal.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function modal() {


	//=============  MODAL  ====================

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



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (modal);

/***/ }),

/***/ "./js/modules/rest.js":
/*!****************************!*\
  !*** ./js/modules/rest.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "operatorRest": () => (/* binding */ operatorRest),
/* harmony export */   "operatorSpread": () => (/* binding */ operatorSpread)
/* harmony export */ });
//подключение js-файла в главный js-файл:
// 1) в главном js-файле :  import funcRest from './rest.js';
// 2) index.html к тегу script добавит атрибут type="module" 
// 3)  в дополнительном js-файле: весь код обворачиваем в функцию и экпортируем ее с помощью -  export default name; 
//Более универсальный вариант: заталкиваем функции в виде значений в объект, а потом по ключам вызываем их, передаем в главный файл через переменные    

//Остаточные параметры (rest parameters)
// Синтаксис остаточных параметров функции позволяет представлять неограниченное множество аргументов в виде массива.



const helpers = {

	operatorRest: function () {

		const log = function (a, b, ...rest) {
			console.log(a, b, ...rest);
			console.log(a, b, rest);
		}
		//'rew', 'fop' попадают в массив благодаря  "...rest"
		log('ada', 'boy', 'rew', 'fop');

		function calcOrDouble(number, basis = 5) {
			console.log(number * basis);
		}
		calcOrDouble(3, 7);

	},

	operatorSpread: function () {

		const cityUSA = ['New-York', 'Los-Angeles', 'Washington', 'Mayami']
		const cityEurope = ['London', 'Paris', 'Kiyv']

		console.log(...cityUSA);
		console.log(...cityEurope);


		//метод  concat, более старший метод
		const allCitiesConcat = cityEurope.concat(cityUSA);
		console.log(allCitiesConcat);
		// spread - более мощный
		const allCities = [...cityUSA, 'Rome', ...cityEurope]
		console.log(allCities);

		// spread -  дает возможность работать с объектами
		const populationUSA = {
			'New-York': 15,
			'Los-Angeles': 10,
			Washington: 7,
			Mayami: 3,
		};
		const populationEU = {
			London: 17,
			Paris: 8,
			Kiyv: 5,
			Mayami: 5,
		};
		const populationAll = ({ ...populationUSA, ...populationEU });
		console.log(populationAll);

		//с помощью spread мы можем коллекцию преобразовать в массив и работать с ним как с массивом, т.е. использовать все методы массива (map, filter, etc)
		const divs = document.querySelectorAll('div');
		const nodes = [...divs];




	},

}

// export default funcRest;    так делаем если экпортируем одну функцию по дефолту
const operatorRest = helpers.operatorRest;
const operatorSpread = helpers.operatorSpread;

/***/ }),

/***/ "./js/modules/slider.js":
/*!******************************!*\
  !*** ./js/modules/slider.js ***!
  \******************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function slider() {

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
				transition: opacity .5s ease;
		`;

		if (i == 0) {
			dot.style.opacity = 1;
		}

		indicators.append(dot);
		dots.push(dot);
	}

	addZeroTotal();
	addZeroCurrent();

	//функция содержит регулярное выражение, оставляет цифры обрезая не числа('px' преобразовует в '')
	function deleteNotDigits(str) {
		return +str.replace(/\D/g, '');
	}

	next.addEventListener('click', () => {
		if (offset == deleteNotDigits(width) * (slides.length - 1)) {
			offset = 0;
		} else {
			offset += deleteNotDigits(width);
		}
		//интерполяция
		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == slides.length) {
			slideIndex = 1;
		}
		else {
			slideIndex++;
		}

		addZeroCurrent();

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';

	});

	prev.addEventListener('click', () => {
		if (offset == 0) {
			offset = deleteNotDigits(width) * (slides.length - 1);
		} else {
			offset -= deleteNotDigits(width);
		}

		slidesField.style.transform = `translateX(-${offset}px)`;

		if (slideIndex == 1) {
			slideIndex = slides.length;
		}
		else {
			slideIndex--;
		}

		addZeroCurrent();

		dots.forEach(dot => dot.style.opacity = '.5');
		dots[slideIndex - 1].style.opacity = '1';
	});

	//реагирование на клики по дотам
	dots.forEach(dot => {
		dot.addEventListener('click', (e) => {
			const slideTo = e.target.getAttribute('data-slide-to');

			slideIndex = slideTo;
			offset = deleteNotDigits(width) * (slideTo - 1);
			slidesField.style.transform = `translateX(-${offset}px)`;

			addZeroCurrent();

			dots.forEach(dot => dot.style.opacity = '.5');
			dots[slideIndex - 1].style.opacity = '1';
		});
	})

	//функции добавления нуля к однозначным числам
	function addZeroCurrent() {
		if (slides.length < 10) {
			current.textContent = `0${slideIndex}`;
		} else {
			current.textContent = slideIndex;
		}
	}
	function addZeroTotal() {
		if (slides.length < 10) {
			total.textContent = `0${slides.length}`;
		} else {
			total.textContent = slides.length;
		}
	}


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (slider);

/***/ }),

/***/ "./js/modules/tabs.js":
/*!****************************!*\
  !*** ./js/modules/tabs.js ***!
  \****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function tabs() {

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


}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (tabs);

/***/ }),

/***/ "./js/modules/timer.js":
/*!*****************************!*\
  !*** ./js/modules/timer.js ***!
  \*****************************/
/***/ ((__unused_webpack_module, __webpack_exports__, __webpack_require__) => {

__webpack_require__.r(__webpack_exports__);
/* harmony export */ __webpack_require__.d(__webpack_exports__, {
/* harmony export */   "default": () => (__WEBPACK_DEFAULT_EXPORT__)
/* harmony export */ });
function timer() {

	//======================TIMER=================================

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



}

/* harmony default export */ const __WEBPACK_DEFAULT_EXPORT__ = (timer);

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	// The module cache
/******/ 	var __webpack_module_cache__ = {};
/******/ 	
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/ 		// Check if module is in cache
/******/ 		var cachedModule = __webpack_module_cache__[moduleId];
/******/ 		if (cachedModule !== undefined) {
/******/ 			return cachedModule.exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = __webpack_module_cache__[moduleId] = {
/******/ 			// no module.id needed
/******/ 			// no module.loaded needed
/******/ 			exports: {}
/******/ 		};
/******/ 	
/******/ 		// Execute the module function
/******/ 		__webpack_modules__[moduleId](module, module.exports, __webpack_require__);
/******/ 	
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/ 	
/************************************************************************/
/******/ 	/* webpack/runtime/define property getters */
/******/ 	(() => {
/******/ 		// define getter functions for harmony exports
/******/ 		__webpack_require__.d = (exports, definition) => {
/******/ 			for(var key in definition) {
/******/ 				if(__webpack_require__.o(definition, key) && !__webpack_require__.o(exports, key)) {
/******/ 					Object.defineProperty(exports, key, { enumerable: true, get: definition[key] });
/******/ 				}
/******/ 			}
/******/ 		};
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/hasOwnProperty shorthand */
/******/ 	(() => {
/******/ 		__webpack_require__.o = (obj, prop) => (Object.prototype.hasOwnProperty.call(obj, prop))
/******/ 	})();
/******/ 	
/******/ 	/* webpack/runtime/make namespace object */
/******/ 	(() => {
/******/ 		// define __esModule on exports
/******/ 		__webpack_require__.r = (exports) => {
/******/ 			if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 				Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 			}
/******/ 			Object.defineProperty(exports, '__esModule', { value: true });
/******/ 		};
/******/ 	})();
/******/ 	
/************************************************************************/
var __webpack_exports__ = {};
// This entry need to be wrapped in an IIFE because it need to be isolated against other modules in the chunk.
(() => {
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
__webpack_require__.r(__webpack_exports__);
/* harmony import */ var _modules_clone_js__WEBPACK_IMPORTED_MODULE_0__ = __webpack_require__(/*! ./modules/clone.js */ "./js/modules/clone.js");
/* harmony import */ var _modules_rest_js__WEBPACK_IMPORTED_MODULE_1__ = __webpack_require__(/*! ./modules/rest.js */ "./js/modules/rest.js");
/* harmony import */ var _modules_modal__WEBPACK_IMPORTED_MODULE_2__ = __webpack_require__(/*! ./modules/modal */ "./js/modules/modal.js");
/* harmony import */ var _modules_tabs__WEBPACK_IMPORTED_MODULE_3__ = __webpack_require__(/*! ./modules/tabs */ "./js/modules/tabs.js");
/* harmony import */ var _modules_timer__WEBPACK_IMPORTED_MODULE_4__ = __webpack_require__(/*! ./modules/timer */ "./js/modules/timer.js");
/* harmony import */ var _modules_cards__WEBPACK_IMPORTED_MODULE_5__ = __webpack_require__(/*! ./modules/cards */ "./js/modules/cards.js");
/* harmony import */ var _modules_calc__WEBPACK_IMPORTED_MODULE_6__ = __webpack_require__(/*! ./modules/calc */ "./js/modules/calc.js");
Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules / forms'"); e.code = 'MODULE_NOT_FOUND'; throw e; }());
/* harmony import */ var _modules_slider__WEBPACK_IMPORTED_MODULE_8__ = __webpack_require__(/*! ./modules/slider */ "./js/modules/slider.js");












window.addEventListener('DOMContentLoaded', () => {


	(0,_modules_tabs__WEBPACK_IMPORTED_MODULE_3__["default"])();
	(0,_modules_modal__WEBPACK_IMPORTED_MODULE_2__["default"])();
	(0,_modules_timer__WEBPACK_IMPORTED_MODULE_4__["default"])();
	(0,_modules_cards__WEBPACK_IMPORTED_MODULE_5__["default"])();
	(0,_modules_calc__WEBPACK_IMPORTED_MODULE_6__["default"])();
	Object(function webpackMissingModule() { var e = new Error("Cannot find module './modules / forms'"); e.code = 'MODULE_NOT_FOUND'; throw e; }())();
	(0,_modules_slider__WEBPACK_IMPORTED_MODULE_8__["default"])();



	// operatorRest();
	// operatorSpread();
	// requestFile();


});
})();

/******/ })()
;
//# sourceMappingURL=bundle.js.map