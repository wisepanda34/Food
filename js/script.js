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

	tabs();
	modal('[data-modal]', '.modal', modalTimerId);
	timer();
	cards();
	calc();
	forms(modalTimerId);
	slider();


	// operatorRest();
	// operatorSpread();
	// requestFile();


});