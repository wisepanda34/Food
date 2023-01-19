'use strict';
import { requestFile } from './modules/clone.js';
import { operatorRest, operatorSpread } from './modules/rest.js';

import modal from './modules/modal';
import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules / forms';
import slider from './modules/slider';

window.addEventListener('DOMContentLoaded', () => {


	tabs();
	modal();
	timer();
	cards();
	calc();
	forms();
	slider();



	// operatorRest();
	// operatorSpread();
	// requestFile();


});