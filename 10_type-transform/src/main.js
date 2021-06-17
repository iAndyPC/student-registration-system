'use strict';

let students = [
   {name: 'Алиса', surname: 'Мухина', patronymic: 'Леонидовна', dateOfBirth: new Date(1994, 5, 11), yearOfBeginning : 2020, faculty: 'Писательство'},
   {name: 'Дмитрий', surname: 'Мельников', patronymic: 'Матвеевич', dateOfBirth: new Date(1995, 1, 14), yearOfBeginning : 2019, faculty: 'Архитектура'},
   {name: 'Мария', surname: 'Колесникова', patronymic: 'Александровна', dateOfBirth: new Date(1997, 10, 4), yearOfBeginning : 2015, faculty: 'Дизайн'},
   {name: 'Максим', surname: 'Румянцев', patronymic: 'Егорович', dateOfBirth: new Date(1996, 3, 26), yearOfBeginning : 2018, faculty: 'Дизайн'},
   {name: 'Марк', surname: 'Иванов', patronymic: 'Максимович', dateOfBirth: new Date(1998, 4, 7), yearOfBeginning : 2013, faculty: 'Право'},
];

(function () { //Handling the button to open the add student form
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
   studentInDOM(JSON.parse(localStorage.getItem('studentsArray')));
})(students);

function formValidation () {
   //Year of beginning
   let currentDate = new Date(), currentYear = currentDate.getFullYear(), checkYearOfBeginning, checkDateOfBirth;
   document.getElementById('yearOfBeginningInput')
      .addEventListener('focusout', function (e) {
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
   document.getElementById('dateOfBirthInput')
      .addEventListener('focusout', function (e) {
      let errorMassage_date = document.getElementById('dateOfBirthError');
      let currentDate = new Date(), currentYear = currentDate.getFullYear();
      let currentMonth = currentDate.getMonth()+1, currentDay = currentDate.getDate();
      let enteredYear = this.value.slice(0, 4), enteredMonth = this.value.slice(5, 7);
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
   }); //Trim
   function trimThis(el) {
      document.getElementById(el)
         .addEventListener('focusout', function (e) {
         this.value = this.value.trim();
      })
   } trimThis('nameInput'); trimThis('surnameInput'); trimThis('patronymicInput');
   trimThis('dateOfBirthInput'); trimThis('yearOfBeginningInput'); trimThis('facultyInput');
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
      studentInDOM(undefined, studentObj);
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

function sortingStudents () { //Sorting students by swapping tableRow in a table
   const tableBody = document.querySelector("tbody");
   const tableHead_name = document.getElementById('tableHead_name')
   const tableHead_faculty = document.getElementById('tableHead_faculty');
   const tableHead_dateOfBirth = document.getElementById('tableHead_dateOfBirth');
   const tableHead_yearOfBeginning = document.getElementById('tableHead_yearOfBeginning');
   tableHead_name.addEventListener("click", (e) => {
      let sortedRows = Array.from(tableBody.rows)
         .sort((rowA, rowB) =>
            rowA.cells[0].innerHTML > rowB.cells[0].innerHTML ? 1 : -1);
      tableBody.append(...sortedRows);
   })
   tableHead_faculty.addEventListener("click", (e) => {
      let sortedRows = Array.from(tableBody.rows)
         .sort((rowA, rowB) =>
            rowA.cells[1].innerHTML > rowB.cells[1].innerHTML ? 1 : -1);
      tableBody.append(...sortedRows);
   })
   tableHead_dateOfBirth.addEventListener("click", (e) => {
      let sortedRows = Array.from(tableBody.rows)
         .sort((rowA, rowB) =>
            rowA.cells[2].innerHTML > rowB.cells[2].innerHTML ? 1 : -1);
      tableBody.append(...sortedRows);
   })
   tableHead_yearOfBeginning.addEventListener("click", (e) => {
      let sortedRows = Array.from(tableBody.rows)
         .sort((rowA, rowB) =>
            rowA.cells[3].innerHTML > rowB.cells[3].innerHTML ? 1 : -1);
      tableBody.append(...sortedRows);
   })
} sortingStudents();

function filteringStudents () {
   const studentsArr = JSON.parse(localStorage.getItem('studentsArray'));
   const filterInput_fullName = document.getElementById('filterName');
   const filterInput_faculty = document.getElementById('filterFaculty');
   const filterInput_yearOfBeginning = document.getElementById('filterYearOfBeginning');
   const filterInput_yearOfGraduation = document.getElementById('filterYearOfGraduation');
   let filteredArr = [];
   for (let student of studentsArr) {
      const regName = new RegExp(filterInput_fullName.value, 'i');
      const regFaculty = new RegExp(filterInput_faculty.value, 'i');
      const regYearOfBeginning = new RegExp(filterInput_yearOfBeginning.value, 'i');
      const regYearOfGraduation = new RegExp(filterInput_yearOfGraduation.value, 'i');
      const strFullName = student.surname + student.name + student.patronymic;
      const strFaculty = student.faculty, str_yearOfBeginning = String(student.yearOfBeginning);
      const strYearOfGraduation = String(student.yearOfBeginning + 4);
      if (regName.test(strFullName) && regFaculty.test(strFaculty) && regYearOfBeginning.test(str_yearOfBeginning) &&
         regYearOfGraduation.test(strYearOfGraduation) ) {
         filteredArr.push(student)
      }
   }
   studentInDOM(filteredArr)
}
function startingFilter () {
   const filterContainer = document.getElementById('filterContainer');
   let filteringDelay;
   filterContainer.querySelectorAll('input').forEach(input =>
      input.addEventListener('input', (e) => {
      clearInterval(filteringDelay)
      filteringDelay = setTimeout(filteringStudents, 1000);
   }));
} startingFilter()

//All that relates to the addition of students in DOM
function declOfNum (n, textFormsArr) {
   n = Math.abs(n) % 100;
   let n1 = n % 10;
   if (n > 10 && n < 20) { return textFormsArr[2]; }
   if (n1 > 1 && n1 < 5) { return textFormsArr[1]; }
   if (n1 === 1) { return textFormsArr[0]; }
   return textFormsArr[2];
}
function createDateOfBirth (student) { //Creates a string with birthday and age
   let todayDate = new Date(), todayYear = todayDate.getFullYear();
   let todayMonth = todayDate.getMonth()+1, todayDay = todayDate.getDate();
   let dateOfBirth = new Date(student.dateOfBirth), birthYear = dateOfBirth.getFullYear();
   let birthMonth = dateOfBirth.getMonth()+1, birthDay = dateOfBirth.getDate(), age = todayYear - birthYear;
   if (todayMonth < (birthMonth - 1)) {
      age--;
   }
   if (((birthMonth - 1) === todayMonth) && (todayDay < birthDay)) {
      age--;
   }
   return birthDay +'.'+ birthMonth +'.'+ birthYear +' (' + age + ' ' + declOfNum(age, ['год', 'года', 'лет']) +')'
}
function createYearsOfStudy (student) { //Creates a string with years of study and course
   let todayDate = new Date(), todayYear = todayDate.getFullYear();
   let todayMonth = todayDate.getMonth()+1, yearOfGraduation;
   let yearOfBeginning = +student.yearOfBeginning, textGraduatedOrCourseNumber;
   let currentCourse = todayYear - yearOfBeginning;

   if (currentCourse === 4 && todayMonth > 9 || currentCourse > 4) {
      yearOfGraduation = yearOfBeginning + 4;
      textGraduatedOrCourseNumber = '(закончил)';
   } else if (todayMonth > 9) {
      textGraduatedOrCourseNumber = '('+ currentCourse+1 +'курс)';
   } else if (textGraduatedOrCourseNumber !== '(закончил)') {
      textGraduatedOrCourseNumber = '('+ currentCourse +' курс)'
   }
   return yearOfBeginning +' '+ textGraduatedOrCourseNumber;
}
function studentInDOM (arrayStudents, newStudent) { //Adding an array or new student to the DOM
   let tableBody = document.querySelector('tbody');
   //Adding an array
   if (arrayStudents !== undefined) {
      tableBody.querySelectorAll("tr").forEach(tr => {tr.remove()})
      for (let student of arrayStudents) {
         let tableRow = document.createElement('tr');
         tableRow.innerHTML = `
            <td class='table__name'>${student.surname +' '+ student.name +' '+ student.patronymic}</td>
            <td class="table__faculty">${student.faculty}</td>
            <td class="table__dateOfBirth">${createDateOfBirth(student)}</td>
            <td class="table__yearsOfStudy">${createYearsOfStudy(student)}</td>
         `;
         tableBody.append(tableRow)
      }
   }
   //Adding an object
   if (arrayStudents === undefined && newStudent !== undefined) {
      let tableRow = document.createElement('tr');
      tableRow.innerHTML = `
         <td class='table__name'>${newStudent.surname +' '+ newStudent.name +' '+ newStudent.patronymic}</td>
         <td class="table__faculty">${newStudent.faculty}</td>
         <td class="table__dateOfBirth">${createDateOfBirth(newStudent)}</td>
         <td class="table__yearsOfStudy">${createYearsOfStudy(newStudent)}</td>
      `;
      tableBody.append(tableRow)
   }
}
