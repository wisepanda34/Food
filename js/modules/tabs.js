function tabs(tabsSelector, tabsContentSelector, tabsParentSelector, activeClass) {

	//=========TABS====================================================
	const tabs = document.querySelectorAll(tabsSelector);
	const tabParent = document.querySelector(tabsContentSelector);
	const tabsContent = document.querySelectorAll(tabsParentSelector);

	function hideTabsContent() {
		tabs.forEach(item => {
			item.classList.remove(activeClass);
		});

		tabsContent.forEach(item => {
			item.classList.remove('show', 'fade');
			item.classList.add('hide');

		});
	}

	function showTabsContent(i = 0) {
		tabs[i].classList.add(activeClass);
		tabsContent[i].classList.remove('hide');
		tabsContent[i].classList.add('show', 'fade');
	}

	tabParent.addEventListener('click', (e) => {
		e.preventDefault();
		if (e.target && e.target.classList.contains(tabsSelector.slice(1))) {
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

export default tabs;