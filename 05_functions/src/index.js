let emails = [
	'centr3@svetochokna.ru',
	'anders-vrn@yandex.ru',
	'calllarussia@gmail.com',
	'help@fixlab36.ru',
	'mama@looklie.ru',
	'slava@bvf.ru',
	'clients@vdgb-soft.ru',
	'deutsch.inskype@yandex.ru',
	'ifmk@yandex.ru',
]
let badEmails = [
	'asp009@bk.ru',
	'pchola73@rambler.ru',
	'vladimir-akatv@mail.ru',
]

function goodEmails (arrEmails, arrBadEmails) {
	return arrEmails;
} goodEmails(emails, badEmails);
//==================================

function calcNumMinusPercent (num, percent) {
	let result = num - (num / 100 * percent)
	if (result < 0) {
		result = 0
	}
	return result;
}

function checkout (sum, numOfItems, promoCode = null) {
	if (promoCode === 'ДАРИМ300') {
		sum = sum - 300
		if (sum <= 300) {
			sum = 0
		}
	}
	if (numOfItems >= 10) {
		sum = calcNumMinusPercent(sum, 5)
	}
	if (sum > 50000) {
		let excess = sum - 50000
		sum = 50000 + calcNumMinusPercent(excess, 20)
	}
	if (promoCode === 'СКИДКА15' && sum >= 20000) {
		sum = calcNumMinusPercent(sum, 15)
	}
	console.log(sum);
} checkout(60000, 2, 'СКИДКА15');
//==================================
