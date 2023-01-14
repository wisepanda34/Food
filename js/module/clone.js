'use strict';
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
export const requestFile = requestCode.requestFile;