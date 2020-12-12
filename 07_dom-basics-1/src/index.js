'use strict';

(function () {
	let startCountButton = document.querySelector('.startCountButton')
	let inputSeconds = document.querySelector('.inputSeconds')
	let counterWindow = document.querySelector('.counterWindow')
	let timerForCounter

	startCountButton.addEventListener('click', () => {
		clearInterval(timerForCounter)
		let counterWindow_num = parseInt(inputSeconds.value)
		if (isNaN(counterWindow_num)) {
			alert('Введено не число')
			clearInterval(timerForCounter)
		}
		counterWindow.textContent = counterWindow_num

		function counter () {
			if (counterWindow_num > -1) {
				counterWindow.textContent = counterWindow_num
				counterWindow_num--
			}
		}
		timerForCounter = setInterval(counter, 1)
	})
})();
