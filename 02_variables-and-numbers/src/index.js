function findOppositeNumbers (x1, x2, y1, y2) {
	const sideA = Math.abs(x1 - x2)
	const sideB = Math.abs(y1 - y2)
	console.log(sideA * sideB)
}
findOppositeNumbers(2, 10, 3, 5)
// End of the first task

function fractionalRounding (numA, numB, n) {
	numA = numA.toFixed(n)
	numB = numB.toFixed(n)

	console.log(+(String(numA)).split('.')[1])
	console.log(+(String(numB)).split('.')[1])
}
fractionalRounding(13.123456789, 2.123, 5) // Write two numbers here
// End of the second task

function randomNum(min, max){
	let num  = Math.round(min+Math.random() * (max-min));
	return num % 2 != 0 ? num: randomNum(min, max);
}
console.log(randomNum(0, 100)) // The range of numbers to write here
