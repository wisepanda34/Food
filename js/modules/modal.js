function openModal(modalSelector, modalTimerId) {
	const modal = document.querySelector(modalSelector);
	modal.classList.add('show');
	document.body.style.overflow = 'hidden';
	console.log(modalTimerId);
	//если пользователь самостоятельно откроет модалку раньше чем произойдет автовызов, то автовызов мы отключаем
	if (modalTimerId) {
		clearInterval(modalTimerId);
	}
};

function closeModal(modalSelector) {
	const modal = document.querySelector(modalSelector);
	modal.classList.remove('show');
	document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimerId) {


	//=============  MODAL  ====================

	const modal = document.querySelector(modalSelector);
	const modalTrigger = document.querySelectorAll(triggerSelector);
	// const modalCloseCross = document.querySelector('[data-close]');//убираем т.к. это не работает с динамическим объектом закрытия



	modalTrigger.forEach(item => {
		item.addEventListener('click', () => openModal(modalSelector, modalTimerId));
	});

	// modalCloseCross.addEventListener('click', closeModal);

	modal.addEventListener('click', (e) => {
		//добавляем в условие клик по любому объекту с атрибутом 'data-close' в том числе и динамические
		if (e.target === modal || e.target.getAttribute('data-close') == '') {
			closeModal(modalSelector);
		}
	});

	document.addEventListener('keydown', (e) => {

		if (e.code === "Escape" && modal.classList.contains('show')) {
			closeModal(modalSelector);
		}
	});


	//функция вызова модального окна при досклолливании до низа сайта
	function modalByScroll() {
		if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight) {
			openModal(modalSelector, modalTimerId);

			//для предупреждения повторного открытия модального окна при концевом скроллинге
			window.removeEventListener('scroll', modalByScroll);
		}
	}

	// автовызов модального окна при проскролле до низа сайта
	window.addEventListener('scroll', modalByScroll);



}

export default modal;
export { openModal, closeModal }; 