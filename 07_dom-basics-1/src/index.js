'use strict';

(function () {
	let startCountButton = document.querySelector('.startCountButton');
	let inputSeconds = document.querySelector('.inputSeconds');
	let counterWindow = document.querySelector('.counterWindow');
	let timerForCounter

	startCountButton.addEventListener('click', () => {
		clearInterval(timerForCounter);
		let counterWindow_num = parseInt(inputSeconds.value);
		if (isNaN(counterWindow_num)) {
			alert('Введено не число');
			clearInterval(timerForCounter);
		}
		counterWindow.textContent = counterWindow_num;

		function counter () {
			if (counterWindow_num > 0) {
				counterWindow_num--
				counterWindow.textContent = counterWindow_num
			} else {
				clearInterval(timerForCounter);
			}
		}
		timerForCounter = setInterval(counter, 1000);
	})
})();
