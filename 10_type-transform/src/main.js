'use strict';

let students = [
   {name: 'Алиса', surname: 'Мухина', patronymic: 'Леонидовна', dateOfBirth: new Date(1994, 5, 11), yearOfBeginning : 2020, faculty: 'Писательство'},
   {name: 'Дмитрий', surname: 'Мельников', patronymic: 'Матвеевич', dateOfBirth: new Date(1995, 1, 14), yearOfBeginning : 2019, faculty: 'Архитектура'},
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

      console.log(JSON.parse(localStorage.getItem('studentsArray')))
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
} formValidation();

function addingStudent () { //An object with a student is created and added to the localStorage array.
   let form = document.querySelector('form');
   form.addEventListener('submit', function (e) {
      e.preventDefault();
      let studentsArray = JSON.parse(localStorage.getItem('studentsArray'));
      let yearOfBeginning = document.getElementById('yearOfBeginningInput').value;
      yearOfBeginning = +yearOfBeginning;
      let studentObj = {
         name: document.getElementById('nameInput').value,
         surname: document.getElementById('surnameInput').value,
         patronymic: document.getElementById('patronymicInput').value,
         dateOfBirth: new Date(document.getElementById('dateOfBirthInput').value),
         yearOfBeginning: yearOfBeginning,
         faculty: document.getElementById('facultyInput').value,
      };
      studentsArray.push(studentObj);
      localStorage.setItem('studentsArray', JSON.stringify(studentsArray));
      //reset and close the form
      e.target.reset();
      let buttonOpenForm = document.getElementById('openFormAddStudent');
      buttonOpenForm.classList.remove('closed');
      form.classList.remove('open');
      form.classList.add('closed');
   });
} addingStudent();

function sortingStudents () { //Creates a sorted array of students and passes it to the render function
   let tableHead = document.querySelector('thead');
   tableHead.addEventListener('click', function (e) {
      let th = e.target.closest('th');
      if (!th) return;
      if (!tableHead.contains(th)) return;
      //We take an array from localStorage
      let studentsArray = JSON.parse(localStorage.getItem('studentsArray'));
      let sortedArray;
      if (th.classList.contains('tableHead_name')) {
         sortedArray = studentsArray.sort(function (a, b) {
            let nameA = a.surname.toLowerCase() + a.name.toLowerCase() + a.patronymic.toLowerCase();
            let nameB = b.surname.toLowerCase() + b.name.toLowerCase() + b.patronymic.toLowerCase();
            if (nameA < nameB) return -1;
            if (nameA > nameB) return 1;
            return 0;
         });
         arrayInDOM(sortedArray);
      }
      if (th.classList.contains('tableHead_faculty')) {
         sortedArray = studentsArray.sort(function (a, b) {
            let facultyA = a.faculty.toLowerCase(), facultyB = b.faculty.toLowerCase();
            if (facultyA < facultyB) return -1;
            if (facultyA > facultyB) return 1;
            return 0;
         })
         arrayInDOM(sortedArray);
      }
      if (th.classList.contains('tableHead_dateOfBirth')) {
         sortedArray = studentsArray.sort(function (a, b) {
            let dateA = new Date(a.dateOfBirth), dateB = new Date(b.dateOfBirth);
            return dateA - dateB;
         })
         arrayInDOM(sortedArray);
      }
      if (th.classList.contains('tableHead_yearOfBeginning')) {
         sortedArray = studentsArray.sort(function (a, b) {
            return a.yearOfBeginning - b.yearOfBeginning;
         })
         arrayInDOM(sortedArray);
      }
   })
} sortingStudents();

function arrayInDOM (arrayStudents, newStudent) { //Adding an array or new student to the DOM
   let tableBody = document.querySelector('tbody');
   for (let student of arrayStudents) {
      let tr = document.createElement('tr'), td = document.createElement('td');
      td = student.surname + ' ' + student.name + ' ' + student.patronymic;
      tr.append(td);
      td = student.faculty;
      tr.append(td);
   }
}
