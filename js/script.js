'use strict';
// import { requestFile } from './modules/clone.js';
// import { operatorRest, operatorSpread } from './modules/rest.js';

import modal from './modules/modal.js';
import tabs from './modules/tabs.js';
import timer from './modules/timer.js';
import cards from './modules/cards.js';
import calc from './modules/calc.js';
import forms from './modules/forms.js';
import slider from './modules/slider.js';
import { openModal } from './modules/modal.js';

window.addEventListener('DOMContentLoaded', () => {
	//автовызов функции 
	const modalTimerId = setTimeout(() => openModal('.modal', modalTimerId), 50000);

	tabs('.tabheader__item', '.tabheader__items', '.tabcontent', 'tabheader__item_active');
	modal('[data-modal]', '.modal', modalTimerId);
	timer('.timer', '2023-05-15');
	cards();
	calc();
	forms('form', modalTimerId);
	slider({
		container: '.offer__slider',
		slide: '.offer__slide',
		nextArrow: '.offer__slider-next',
		prevArrow: '.offer__slider-prev',
		totalCounter: '#total',
		currentCounter: '#current',
		wrapper: '.offer__slider-wrapper',
		field: '.offer__slider-inner'
	});


	// operatorRest();
	// operatorSpread();
	// requestFile();


});