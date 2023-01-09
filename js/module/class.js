'use strict';
//Теория по теме создания классов и их потомков по шаблону класса

//1) Обычная функция, this = window, или this = undefined(если 'use strict')
function showThis(a, b) {
	console.log(this);
	function sum() {
		console.log(this);
		return a + b;
	}
	console.log(sum);
}
showThis(4, 5);


//2) Метод объекта. Контекс у методов объекта - сам объект
const obj = {
	a: 20,
	b: 15,
	sum: function () {
		console.log(this);
	}
};

obj.sum();

//3) Функция-конструктор. Через this каждому объекту будут доступны все свойства функции-конструктора.
//т.е. this в констукторах и классах - это новый экземпляр родительского объекта

function User(name, id) {
	this.name = name;
	this.id = id;
	this.human = true;
	this.hello = function () {
		console.log('Hello ' + this.name);
	};
}

let ivan = new User('Ivan', 23);
ivan.hello();


//4) Ручная привязка this с помощью методов: call, apply, bind
function sayName(surname, old) {
	console.log(this);
	console.log(this.name + surname + old);
}

const user = {
	name: 'John',
}

sayName.call(user, 'Smith', 38);
sayName.apply(user, ['Smith', 38]);

function count(num) {
	return this * num;
}

//bind => num, double(3) => this
const double = count.bind(2);
console.log(double(3));
console.log(double(10));

//--------------------------------------------

const btn = document.querySelector('button');

btn.addEventListener("click", function () {
	console.log(this);
	this.style.backgroundColor = 'red';
});
// this=e.target  ,т.е. В случае написания функции в классическом виде - контекстом вызова будет сам элемент на котором произошло событие. Если в обработчике событий вместо классического режима функции использывать стрелочную, то так как она не имеет своего контекста вызова, то получим undefined и ошибку. 


const object = {
	num: 5,
	sayNumber: function () {
		const say = () => {
			console.log(this.num);
		};
		say();
	}
};
// Стрелочная функция не имеет своего контекста вызова, поэтому берет контекс у своего родителя - метода sayNumber(в данном случае), а метод ссылается на сам объект 

object.sayNumber();


const trible = a => a * 2;
console.log(trible(5));

console.log('======  ES6  CLASS  ======');
//===============================  ES6     CLASS     =====================================

class Rectangle {
	constructor(height, width) {
		this.height = height;
		this.width = width;
	}
	calcArea() {
		return this.height * this.width;
	}
}

const square = new Rectangle(10, 10);
const long = new Rectangle(18, 100);
console.log(square.calcArea());
console.log(long.calcArea());


//Создаем класс ColoredRectangleWithText, который наследуется от Rectangle с помощью ключ.слова extends
// Для обозначения наследования тех свойств которые нужны используем  "super()" и свойств в виде аргументов
class ColoredRectangleWithText extends Rectangle {
	constructor(height, width, text, bgColor) {
		super(height, width);
		this.text = text;
		this.bgColor = bgColor;
	}
	showMyProps() {
		console.log(`Text: ${this.text}, color: ${this.bgColor}`);
	}
}

const div1 = new ColoredRectangleWithText(25, 10, 'Hi extends', 'green');

div1.showMyProps();
console.log(div1.calcArea());
