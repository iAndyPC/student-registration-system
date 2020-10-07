'use strict';

console.log('Первое задание')
function arrayWithRandomNum (count, n, m) {
	let randomNumbers_array = [];
	let maxNum = Math.max(n, m)
	let minNum = Math.min(n, m)

	while (randomNumbers_array.length < count) {
		let rndNum = Math.floor(Math.random() * (maxNum - minNum)) + minNum // Рандомное число в диапазоне
		randomNumbers_array.push(rndNum)
	}
	console.log(randomNumbers_array)
} arrayWithRandomNum(70, 100, -5)

console.log('Второе задание')
function invertString () {
	let string = 'Привет, мир!'
	let stringArray = string.split('')
	let stringArray_inverted = stringArray.reverse()
	let string_inverted = stringArray_inverted.join('')

	console.log(string_inverted)
} invertString()

console.log('Третье задание')
function ridingTank () {
	let tankLives = ['life', 'life']
	let roadMines = [false, false, false, true, false, false, true, false, false, false]

	for (let position = 1; true; position++) {
		let mine = roadMines.shift()

		console.log('Танк переместился на ' + position)
		if (mine === false) {} else {
			tankLives.pop();
			if (tankLives.length === 0) {
				console.log('Танк уничтожен')
				break
			}
			console.log('Танк поврежден')
		}
	}
} ridingTank()

console.log('Четвертое задание, делал не сам')
function date () {
	let month = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31]
	let dayOfWeek = ['понедельник','вторник', 'среда', 'четверг', 'пятница', 'суббота', 'воскресенье']
	let firstDate = 'среда'
	let startCount = dayOfWeek.indexOf(firstDate) - 1
	let currentDay

	for (let i = 1; i <= 31; ++i) {
		startCount++
		currentDay = startCount % 7
		dayOfWeek.push(dayOfWeek[currentDay])
		console.log(`${i} января, ${dayOfWeek[currentDay]}`)
	}
} date()
