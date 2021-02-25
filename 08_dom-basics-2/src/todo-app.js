(function() {
	function createAppTitle(title) {
		let appTitle = document.createElement('h2');
		appTitle.innerHTML = title;
		return appTitle;
	}

	function createTodoItemForm() {
		let form = document.createElement('form');
		let input = document.createElement('input');
		let buttonWrapper = document.createElement('div');
		let button = document.createElement('button');

		form.classList.add('input-group', 'mb-3');
		input.classList.add('form-control');
		input.placeholder = 'Добавьте дело';
		buttonWrapper.classList.add('input-group-append');
		button.classList.add('btn', 'btn-primary');
		button.textContent = 'Добавить';

		buttonWrapper.append(button);
		form.append(input);
		form.append(buttonWrapper);

		return {
			form,
			input,
			button
		}
	}

	function createTodoList() {
		let list = document.createElement('ul');
		list.classList.add('list-group');
		return list;
	}

	function createTodoItem(name) {
		let item = document.createElement('li');
		let buttonGroup = document.createElement('div');
		let doneButton = document.createElement('button');
		let deleteButton = document.createElement('button');

		item.classList.add('list-group-item', 'd-flex', 'justify-content-between', 'align-items-center');
		item.textContent = name;

		buttonGroup.classList.add('btn-group', 'btn-group-sm');
		doneButton.classList.add('btn', 'btn-success');
		doneButton.textContent = 'Готово';
		deleteButton.classList.add('btn', 'btn-danger');
		deleteButton.textContent = 'Удалить';

		buttonGroup.append(doneButton);
		buttonGroup.append(deleteButton);
		item.append(buttonGroup);

		return {
			item,
			doneButton,
			deleteButton
		}
	}

	function createTodoApp(container, title = 'Список дел', keyLocalStorage, arrayTodoList) {
		let todoAppTitle = createAppTitle(title);
		let todoItemForm = createTodoItemForm();
		let todoList = createTodoList();
		if (localStorage.getItem(keyLocalStorage) == null) { // If there is no array with cases in localStorage
            let arrayWithCases_empty = [];
            localStorage.setItem(keyLocalStorage, JSON.stringify(arrayWithCases_empty));
        }

		// To enable or disable the add case button
		todoItemForm.button.disabled = true
		todoItemForm.input.addEventListener('input', function () {
			todoItemForm.button.disabled = todoItemForm.input.value.length <= 0;
		});

		// Cases from localStorage
		if (JSON.parse(localStorage[keyLocalStorage], function (k, v) { return (v) }).length >= 1) { // If the array from localStorage contains cases
			for (let objWithCase of JSON.parse(localStorage[keyLocalStorage], function (k, v) { return (v) })) {
				// Case creation
				let todoItem_fromLocalStorage = createTodoItem(objWithCase.name, objWithCase.done);
				if (objWithCase.done === true) {
					todoItem_fromLocalStorage.item.classList.add('list-group-item-success');
				}
				// Status change done or not
				todoItem_fromLocalStorage.doneButton.addEventListener('click', function() {
					todoItem_fromLocalStorage.item.classList.toggle('list-group-item-success');

					let ul = document.querySelector('ul');
					let liList = ul.querySelectorAll('li');

					let arrCasesAfterStatusChange = [];
					liList.forEach(function (li) {
						let objWithCase  = {
							name: li.innerText.split('\n', 1).pop(),
							done: li.classList.contains('list-group-item-success')
						}
						arrCasesAfterStatusChange.push(objWithCase)
					});
					localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterStatusChange))
					console.log(localStorage[keyLocalStorage])
				});
				// Deleting a case
				todoItem_fromLocalStorage.deleteButton.addEventListener('click', function() {
					if (confirm('Вы уверены?')) {
						todoItem_fromLocalStorage.item.remove();

						let ul = document.querySelector('ul');
						let liList = ul.querySelectorAll('li');

						let arrCasesAfterDeletion = [];
						liList.forEach(function (li) {
							let objWithCase  = {
								name: li.innerText.split('\n', 1).pop(),
								done: li.classList.contains('list-group-item-success')
							}
							arrCasesAfterDeletion.push(objWithCase)
						});
						localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterDeletion))
					}
					console.log(localStorage[keyLocalStorage])
				});
				todoList.append(todoItem_fromLocalStorage.item);
			}
		}

		// Cases from external array
		if (arrayTodoList !== undefined) { // If an array is added, cases from the array will appear
			for (let i = 0; i < arrayTodoList.length; i++) {
				// Case creation
				let todoItem_fromArray = createTodoItem(arrayTodoList[i].name, arrayTodoList[i].done);
				if (arrayTodoList[i].done === true) {
					todoItem_fromArray.item.classList.add('list-group-item-success');
				}
				// Add case to localStorage
				let arrFromLocalStorage = JSON.parse(localStorage[keyLocalStorage])
				arrFromLocalStorage.push(arrayTodoList[i]) // push 1 case from external array
				localStorage.setItem(keyLocalStorage, JSON.stringify(arrFromLocalStorage))

				// Status change done or not
				todoItem_fromArray.doneButton.addEventListener('click', function() {
					todoItem_fromArray.item.classList.toggle('list-group-item-success');

					let ul = document.querySelector('ul');
					let liList = ul.querySelectorAll('li');

					let arrCasesAfterStatusChange = [];
					liList.forEach(function (li) {
						let objWithCase  = {
							name: li.innerText.split('\n', 1).pop(),
							done: li.classList.contains('list-group-item-success')
						}
						arrCasesAfterStatusChange.push(objWithCase)
					});
					localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterStatusChange))
					console.log(localStorage[keyLocalStorage])
				});
				// Deleting a case
				todoItem_fromArray.deleteButton.addEventListener('click', function() {
					if (confirm('Вы уверены?')) {
						todoItem_fromArray.item.remove();

						let ul = document.querySelector('ul');
						let liList = ul.querySelectorAll('li');

						let arrCasesAfterDeletion = [];
						liList.forEach(function (li) {
							let objWithCase  = {
								name: li.innerText.split('\n', 1).pop(),
								done: li.classList.contains('list-group-item-success')
							}
							arrCasesAfterDeletion.push(objWithCase)
						});
						localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterDeletion))
					}
					console.log(localStorage[keyLocalStorage])
				});
				todoList.append(todoItem_fromArray.item);
			}
		}
		container.append(todoAppTitle);
		container.append(todoItemForm.form);
		container.append(todoList);

		// Cases from input field
		todoItemForm.form.addEventListener('submit', function(e) {
			e.preventDefault();

			if (!todoItemForm.input.value) {
				return;
			}
			// Case creation
			let todoItem_fromInput = createTodoItem(todoItemForm.input.value);
			// Status change done or not
			todoItem_fromInput.doneButton.addEventListener('click', function() {
				todoItem_fromInput.item.classList.toggle('list-group-item-success');

				let ul = document.querySelector('ul');
				let liList = ul.querySelectorAll('li');

				let arrCasesAfterStatusChange = [];
				liList.forEach(function (li) {
					let objWithCase  = {
						name: li.innerText.split('\n', 1).pop(),
						done: li.classList.contains('list-group-item-success')
					}
					arrCasesAfterStatusChange.push(objWithCase)
				});
				localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterStatusChange))
				console.log(localStorage[keyLocalStorage])
			});
			// Deleting a case
			todoItem_fromInput.deleteButton.addEventListener('click', function() {
				if (confirm('Вы уверены?')) {
					todoItem_fromInput.item.remove();

					let ul = document.querySelector('ul');
					let liList = ul.querySelectorAll('li');

					let arrCasesAfterDeletion = [];
					liList.forEach(function (li) {
						let objWithCase  = {
							name: li.innerText.split('\n', 1).pop(),
							done: li.classList.contains('list-group-item-success')
						}
						arrCasesAfterDeletion.push(objWithCase)
					});
					localStorage.setItem(keyLocalStorage, JSON.stringify(arrCasesAfterDeletion))
				}
			});

			// Add case to localStorage
			let arrFromLocalStorage = JSON.parse(localStorage[keyLocalStorage])
			let objWithCase  = {
				name: todoItemForm.input.value,
				done: false
			}
			arrFromLocalStorage.push(objWithCase)
			localStorage.setItem(keyLocalStorage, JSON.stringify(arrFromLocalStorage))
			console.log(localStorage[keyLocalStorage])

			todoList.append(todoItem_fromInput.item);
			todoItemForm.input.value = '';
			todoItemForm.button.disabled = true
		});
	}
	window.createTodoApp = createTodoApp;
})();
