'use strict'

function checkPass () {
	let password = '1234-'

	if (password.length > 4 && (password.includes('-') || password.includes('_')) ) {
		console.log('Пароль надежный')
	} else {
		console.log('Пароль недостаточно надёжный')
	}
}
checkPass()

function checkName () {
	let inputName = 'Andrey'
	let inputSurname = 'bART'

	let firstSymbolName = inputName.substr(0, 1)
	let nextSymbolsName = inputName.substr(1)
	firstSymbolName = firstSymbolName.toUpperCase()
	nextSymbolsName = nextSymbolsName.toLowerCase()

	let firstSymbolSurname = inputSurname.substr(0, 1)
	let nextSymbolsSurname = inputSurname.substr(1)
	firstSymbolSurname = firstSymbolSurname.toUpperCase()
	nextSymbolsSurname = nextSymbolsSurname.toLowerCase()

	let resultName = firstSymbolName + nextSymbolsName
	let resultSurname = firstSymbolSurname + nextSymbolsSurname

	console.log(resultName + ' ' + resultSurname)
	console.log(inputName === resultName ? 'Имя осталось без изменений' : 'Имя было преобразовано')
	console.log(inputSurname === resultSurname ? 'Фамилия осталась без изменений' : 'Фамилия была преобразована')
}
checkName()
