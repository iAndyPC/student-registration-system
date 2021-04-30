'use strict';

let students = [
   {name: 'Алиса', surname: 'Мухина', patronymic: 'Леонидовна', dateOfBirth: new Date(1994, 5, 11), yearOfBeginning : 2020, faculty: 'Писательство'},
   {name: 'Дмитрий', surname: 'Мельников', patronymic: 'Матвеевич', dateOfBirth: new Date(1995, 1, 14), yearOfBeginning : 2019, faculty: 'Архитектурв'},
   {name: 'Мария', surname: 'Колесникова', patronymic: 'Александровна', dateOfBirth: new Date(1997, 10, 4), yearOfBeginning : 2015, faculty: 'Дизайн'},
   {name: 'Максим', surname: 'Румянцев', patronymic: 'Егорович', dateOfBirth: new Date(1996, 3, 26), yearOfBeginning : 2018, faculty: 'Дизайн'},
   {name: 'Марк', surname: 'Иванов', patronymic: 'Максимович', dateOfBirth: new Date(1998, 4, 7), yearOfBeginning : 2013, faculty: 'Право'},
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
   //Year of beginning
   let currentDate = new Date();
   let currentYear = currentDate.getFullYear();
   let checkYearOfBeginning
   let checkDateOfBirth
   document.getElementById('yearOfBeginningInput').addEventListener('focusout', function (e) {
      let errorMassage_year = document.getElementById('yearOfBeginningHelp');
      if (this.value >= 2000 && this.value <= currentYear) {
         errorMassage_year.classList.remove('alert-warning');
         errorMassage_year.textContent = 'Год в формате \'2XXX\'';
         checkYearOfBeginning = true;
      } else {
         errorMassage_year.textContent = 'Год должен быть больше 2000, и меньше текущего';
         errorMassage_year.classList.add('alert-warning');
         checkYearOfBeginning = false;
      }
   });
   //Date of birth
   document.getElementById('dateOfBirthInput').addEventListener('focusout', function (e) {
      let errorMassage_date = document.getElementById('dateOfBirthError');
      let currentDate = new Date();
      let currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth()+1;
      let currentDay = currentDate.getDate();
      let enteredYear = this.value.slice(0, 4);
      let enteredMonth = this.value.slice(5, 7);
      let enteredDay = this.value.slice(8, 10);
      enteredYear = +enteredYear;
      enteredMonth = +enteredMonth;
      enteredDay = +enteredDay;

      if (enteredYear >= 1900 && enteredYear <= currentYear) {
         if (enteredYear === currentYear) { //year
            if (enteredMonth <= currentMonth) { //month
               if (enteredMonth === currentMonth) {
                  if (enteredDay <= currentDay) { //day
                     errorMassage_date.classList.remove('open')
                     checkDateOfBirth = true;
                     return;
                  } else { //false
                     errorMassage_date.classList.add('open');
                     checkDateOfBirth = false;
                     return;
                  }
               }
            } else { //false
               errorMassage_date.classList.add('open');
               checkDateOfBirth = false;
               return;
            }
         }
         errorMassage_date.classList.remove('open')
         checkDateOfBirth = true;
      } else { //false
         errorMassage_date.classList.add('open');
         checkDateOfBirth = false;
      }
   });
   //Trim
   function trimThis(el) {
      document.getElementById(el).addEventListener('focusout', function (e) {
         this.value = this.value.trim();
      })
   } trimThis('nameInput'); trimThis('surnameInput'); trimThis('patronymicInput'); trimThis('dateOfBirthInput'); trimThis('yearOfBeginningInput'); trimThis('facultyInput');
} formValidation()

