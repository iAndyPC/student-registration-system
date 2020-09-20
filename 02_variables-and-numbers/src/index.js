function findOppositeNumbers (x1, x2, y1, y2) {
	let xMax = Math.max(x1, x2)
	let xMin = Math.min(x1, x2)
	let yMax = Math.max(y1, y2)
	let yMin = Math.min(y1, y2)

	let OppositeNumbers = {
		xMax: xMax,
		xMin: xMin,
		yMax: yMax,
		yMin: yMin,
	};
	return OppositeNumbers
}
let homework_OppositeNumbers = findOppositeNumbers(2,10,3,5) // Write the coordinates of points here

function findWidthAndLength () {
	let width = homework_OppositeNumbers.yMax - homework_OppositeNumbers.yMin
	let length = homework_OppositeNumbers.xMax - homework_OppositeNumbers.xMin

	let WidthAndLength = {
		width: width,
		length: length,
	};
	return WidthAndLength
}
let homework_widthAndLength = findWidthAndLength()

function findArea () {
	let area = homework_widthAndLength.width * homework_widthAndLength.length
	console.log(area)
}
findArea()
// End of the first task

function fractionalRounding (numA, numB, n) {
	numA = numA.toFixed(n)
	numB = numB.toFixed(n)

	console.log(+(String(numA)).split('.')[1])
	console.log(+(String(numB)).split('.')[1])
}
fractionalRounding(13.123456789, 2.123, 5)
// End of the second task
