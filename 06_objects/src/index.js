'use strict';
let users = [ { name: 'Василий', surname: 'Васильев' }, { name: 'Иван', surname: 'Иванов' }, { name: 'Пётр', surname: 'Петров' } ]
// fn - функция, которую нужно написать (хорошее название тоже нужно придумать) let result = fn(objects, 'name', 'Иван');
// /* Результат выполнения должен быть: [ name: 'Иван', surname: 'Иванов' ] */

function sortingUsers (searchIn, key, value) { //Делал еще по старому заданию
	let result = [];

	for (let objectUser of searchIn) {
		if (key in objectUser) {
			if (objectUser[key] === value) {
				Object.keys(objectUser).forEach(key => result[key] = objectUser[key]); //Эту строку писал не сам
			}
		}
	}
	console.log(result);
}// sortingUsers(users, 'name', 'Иван');
//===============================

let optionsForSelect = [
	{ value: 0, label: 'option1' },
	{ value: 1, label: 'option2' },
	{ value: 2, label: 'option3' },
]

function addElement_select (options_array = [{label: 'select1'}]) {
	let select = document.createElement("select")

	for (let object of options_array) {
		let option = document.createElement("option")
		option.innerHTML = object['label']
		select.append(option)
	}
	document.body.append(select)
}// addElement_select(optionsForSelect);
//===============================

let random_array = [ 1, 2, 'три', 'четыре', ]
let random_object = { value1: 'Значение 1', value2: 'Значение 2'}

function modifyPrimitiveForSelectOptions (arr, obj) {
	let tempObject = {}; // { label: 'option1' }
	let result = []; // [ { label: 'option1' }, ]

	for (let arrElement of arr) {
		tempObject.label = arrElement
		result.push(tempObject)
	}
	console.log(result)

} modifyPrimitiveForSelectOptions(random_array, random_object);
