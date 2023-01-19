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
export const operatorRest = helpers.operatorRest;
export const operatorSpread = helpers.operatorSpread;