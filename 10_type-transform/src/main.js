'use strict';

let students = [
   {name: 'Алиса', surname: 'Мухина', patronymic: 'Леонидовна', dateOfBirth: new Date(1994, 5, 11), YearOfBeginning : 2020, faculty: 'Писательство'},
   {name: 'Дмитрий', surname: 'Мельников', patronymic: 'Матвеевич', dateOfBirth: new Date(1995, 1, 14), YearOfBeginning : 2019, faculty: 'Архитектурв'},
   {name: 'Мария', surname: 'Колесникова', patronymic: 'Александровна', dateOfBirth: new Date(1997, 10, 4), YearOfBeginning : 2015, faculty: 'Дизайн'},
   {name: 'Максим', surname: 'Румянцев', patronymic: 'Егорович', dateOfBirth: new Date(1996, 3, 26), YearOfBeginning : 2018, faculty: 'Дизайн'},
   {name: 'Марк', surname: 'Иванов', patronymic: 'Максимович', dateOfBirth: new Date(1998, 4, 7), YearOfBeginning : 2013, faculty: 'Право'},
 ];

(function () { //button to open the form for adding a student
   let buttonOpenForm = document.getElementById('openFormAddStudent');
   buttonOpenForm.addEventListener('click', function () {
      let formAddStudent = document.querySelector('form');
      let buttonOpenForm = document.getElementById('openFormAddStudent');
      buttonOpenForm.classList.add('closed');
      formAddStudent.classList.remove('closed');
      formAddStudent.classList.add('open');
   });
})();

(function (arr) { //Loading an array into localStorage
   if (localStorage.getItem('studentsArray') == null) {
      localStorage.setItem('studentsArray', JSON.stringify(arr));
   }
})(students);

function formValidation () {
   let form = document.querySelector('form');
   //Name
   console.log(form.getElementById('nameInput'))
}formValidation()
