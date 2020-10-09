'use strict';

function arrayWithRandomNum (count, n, m) {
	let randomNumbers_array = [];
	let maxNum = Math.max(n, m);
	let minNum = Math.min(n, m);

	while (randomNumbers_array.length < count) {
		let rndNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum; // Рандомное число в диапазоне
		randomNumbers_array.push(rndNum);
	}
	console.log(randomNumbers_array);
} arrayWithRandomNum(70, 100, -5);

function invertString () {
	let string = 'Привет, мир!';
	let result = string.split('').reverse().join('');

	console.log(result);
} invertString();

function ridingTank () {
	let tankLives = ['life', 'life'];
	let roadMines = [false, false, false, true, false, false, true, false, false, false];

	for (let position = 1; true; position++) {
		let mine = roadMines.shift();

		console.log('Танк переместился на ' + position);
		if (mine === true) {
			tankLives.pop();
			if (tankLives.length === 0) {
				console.log('Танк уничтожен');
				break
			}
			console.log('Танк поврежден');
		}
	}
} ridingTank()

function date (firstDate) {
	let dayOfWeek = ['понедельник','вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье'];
	let startCount = dayOfWeek.indexOf(firstDate) - 1;
	let currentDay;

	for (let i = 1; i <= 31; ++i) {
		startCount++;
		currentDay = startCount % 7;
		dayOfWeek.push(dayOfWeek[currentDay]);
		console.log(`${i} января, ${dayOfWeek[currentDay]}`);
	}
} date('среда');
