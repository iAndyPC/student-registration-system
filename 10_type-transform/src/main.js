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
   }
   studentInDOM(JSON.parse(localStorage.getItem('studentsArray')));
})(students);

function formValidation () {
   //Year of beginning
   let currentDate = new Date(), currentYear = currentDate.getFullYear();
   let checkYearOfBeginning, checkDateOfBirth;
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

function sortingStudents () { //Creates a sorted array of students and passes it to the render function
   let tableHead = document.querySelector('thead');
   tableHead.addEventListener('click', function (e) {
      let th = e.target.closest('th');
      if (!th) return;
      if (!tableHead.contains(th)) return;
      //take an array from localStorage
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
         studentInDOM(sortedArray);
      } //sorting by faculty
      if (th.classList.contains('tableHead_faculty')) {
         sortedArray = studentsArray.sort(function (a, b) {
            let facultyA = a.faculty.toLowerCase(), facultyB = b.faculty.toLowerCase();
            if (facultyA < facultyB) return -1;
            if (facultyA > facultyB) return 1;
            return 0;
         })
         studentInDOM(sortedArray);
      } //sort by date of birth
      if (th.classList.contains('tableHead_dateOfBirth')) {
         sortedArray = studentsArray.sort(function (a, b) {
            let dateA = new Date(a.dateOfBirth), dateB = new Date(b.dateOfBirth);
            return dateA - dateB;
         })
         studentInDOM(sortedArray);
      } //sort by start year
      if (th.classList.contains('tableHead_yearOfBeginning')) {
         sortedArray = studentsArray.sort(function (a, b) {
            return a.yearOfBeginning - b.yearOfBeginning;
         })
         studentInDOM(sortedArray);
      }
   })
} sortingStudents();

function filteringStudents () {
   const startingArray = JSON.parse(localStorage.getItem('studentsArray'));
   const filterInput_fullName = document.getElementById('filterName');
   const filterInput_faculty = document.getElementById('filterFaculty');
   const filterInput_yearOfBeginning = document.getElementById('filterYearOfBeginning');
   const filterInput_yearOfGraduation = document.getElementById('filterYearOfGraduation');
   let filteringDelay_yearOfBeginning, filteringDelay_faculty, filteringDelay_fullName;
   let filteringDelay_yearOfGraduation, filteredArray = [];
   let arrayFilteredBy_fullName = [], arrayFilteredBy_faculty = [];
   let arrayFilteredBy_yearOfBeginning = [], arrayFilteredBy_yearOfGraduation = [];

   function filterBy_name () {
      let arrayToWorkWith = [], checkAddOrNo = true;
      if (arrayFilteredBy_faculty.length > 0) { //if the faculty filter has worked
         for (let student of arrayFilteredBy_faculty) {
            arrayToWorkWith.push(student)
         }
      }//if the filter by the year of start has worked
      if (arrayFilteredBy_yearOfBeginning.length > 0) {
         for (let student of arrayFilteredBy_yearOfBeginning) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if the filter by end year has worked
      if (arrayFilteredBy_yearOfGraduation.length > 0) {
         checkAddOrNo = true;
         for (let student of arrayFilteredBy_yearOfGraduation) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if none of the filters has worked
      if (arrayToWorkWith.length === 0) {
         arrayToWorkWith = startingArray
      }//the filter itself
      checkAddOrNo = true;
      for (let student of arrayToWorkWith) {
         let string_fullName = student.surname.toLowerCase() + student.name.toLowerCase() + student.patronymic.toLowerCase();
         if (string_fullName.includes(filterInput_fullName.value.toLowerCase())) {
            for (let sameStudent of filteredArray) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) {
               filteredArray.push(student);
               arrayFilteredBy_fullName.push(student);
            }
         }
      }
      //if input is empty, clear the array filtered by this filter
      if (filterInput_fullName.value === '') {
         console.log(filteredArray)
         arrayFilteredBy_fullName = [];
         if (arrayFilteredBy_faculty.length > 0) {
            for (let student of arrayFilteredBy_faculty) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfBeginning.length > 0) {
            for (let student of arrayFilteredBy_yearOfBeginning) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfGraduation.length > 0) {
            for (let student of arrayFilteredBy_yearOfGraduation) {
               filteredArray.push(student)
            }
         }
      }
      studentInDOM(filteredArray);
      filteredArray = [];
   }
   function filterBy_faculty () {
      let arrayToWorkWith = [], checkAddOrNo = true;
      if (arrayFilteredBy_fullName.length > 0) { //if the filter by name worked
         for (let student of arrayFilteredBy_fullName) {
            arrayToWorkWith.push(student)
         }
      }//if the filter by the year of start has worked
      if (arrayFilteredBy_yearOfBeginning.length > 0) {
         for (let student of arrayFilteredBy_yearOfBeginning) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if the filter by end year has worked
      if (arrayFilteredBy_yearOfGraduation.length > 0) {
         checkAddOrNo = true;
         for (let student of arrayFilteredBy_yearOfGraduation) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if none of the filters has worked
      if (arrayToWorkWith.length === 0) {
         arrayToWorkWith = startingArray
      }//the filter itself
      checkAddOrNo = true;
      for (let student of arrayToWorkWith) {
         let string_faculty = student.faculty.toLowerCase();
         if (string_faculty.includes(filterInput_faculty.value.toLowerCase())) {
            for (let sameStudent of filteredArray) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) {
               filteredArray.push(student);
               arrayFilteredBy_faculty.push(student);
            }
         }
      }
      //if input is empty, clear the array filtered by this filter
      if (filterInput_faculty.value === '') {
         console.log(filteredArray)
         arrayFilteredBy_faculty = [];
         if (arrayFilteredBy_fullName.length > 0) {
            for (let student of arrayFilteredBy_fullName) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfBeginning.length > 0) {
            for (let student of arrayFilteredBy_yearOfBeginning) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfGraduation.length > 0) {
            for (let student of arrayFilteredBy_yearOfGraduation) {
               filteredArray.push(student)
            }
         }
      }
      studentInDOM(filteredArray);
      filteredArray = [];
   }
   function filterBy_yearOfBeginning () {
      let arrayToWorkWith = [], checkAddOrNo = true;
      if (arrayFilteredBy_fullName.length > 0) { //if the filter by name worked
         for (let student of arrayFilteredBy_fullName) {
            arrayToWorkWith.push(student)
         }
      }//if the faculty filter has worked
      if (arrayFilteredBy_faculty.length > 0) {
         for (let student of arrayFilteredBy_faculty) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if the filter by end year has worked
      if (arrayFilteredBy_yearOfGraduation.length > 0) {
         checkAddOrNo = true;
         for (let student of arrayFilteredBy_yearOfGraduation) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if none of the filters has worked
      if (arrayToWorkWith.length === 0) {
         arrayToWorkWith = startingArray
      }//the filter itself
      checkAddOrNo = true;
      for (let student of arrayToWorkWith) {
         let number_yearOfBeginning = Number(student.yearOfBeginning);
         if (number_yearOfBeginning === Number(filterInput_yearOfBeginning.value)) {
            for (let sameStudent of filteredArray) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) {
               filteredArray.push(student);
               arrayFilteredBy_yearOfBeginning.push(student);
            }
         }
      }
      //if input is empty, clear the array filtered by this filter
      if (filterInput_yearOfBeginning.value === '') {
         arrayFilteredBy_yearOfBeginning = [];
         if (arrayFilteredBy_fullName.length > 0) {
            for (let student of arrayFilteredBy_fullName) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_faculty.length > 0) {
            for (let student of arrayFilteredBy_faculty) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfGraduation.length > 0) {
            for (let student of arrayFilteredBy_yearOfGraduation) {
               filteredArray.push(student)
            }
         }
      }
      studentInDOM(filteredArray);
      filteredArray = [];
   }
   function filterBy_yearOfGraduation () {
      let arrayToWorkWith = [], checkAddOrNo = true;
      if (arrayFilteredBy_fullName.length > 0) { //if the filter by name worked
         for (let student of arrayFilteredBy_fullName) {
            arrayToWorkWith.push(student)
         }
      }//if the faculty filter has worked
      if (arrayFilteredBy_faculty.length > 0) {
         checkAddOrNo = true;
         for (let student of arrayFilteredBy_faculty) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if the filter by the year of start has worked
      if (arrayFilteredBy_yearOfBeginning.length > 0) {
         checkAddOrNo = true;
         for (let student of arrayFilteredBy_yearOfBeginning) {
            for (let sameStudent of arrayToWorkWith) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) { arrayToWorkWith.push(student) }
         }
      }//if none of the filters has worked
      if (arrayToWorkWith.length === 0) {
         arrayToWorkWith = startingArray
      }//the filter itself
      checkAddOrNo = true;
      for (let student of arrayToWorkWith) {
         let number_yearOfGraduation = Number(student.yearOfBeginning + 4);
         if (number_yearOfGraduation === Number(filterInput_yearOfGraduation.value)) {
            for (let sameStudent of filteredArray) {
               if (student === sameStudent) { checkAddOrNo = false }
            }
            if (checkAddOrNo) {
               filteredArray.push(student);
               arrayFilteredBy_yearOfGraduation.push(student);
            }
         }
      }
      //if input is empty, clear the array filtered by this filter
      if (filterInput_yearOfGraduation.value === '') {
         arrayFilteredBy_yearOfGraduation = [];
         if (arrayFilteredBy_fullName.length > 0) {
            for (let student of arrayFilteredBy_fullName) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_faculty.length > 0) {
            for (let student of arrayFilteredBy_faculty) {
               filteredArray.push(student)
            }
         }
         if (arrayFilteredBy_yearOfBeginning.length > 0) {
            for (let student of arrayFilteredBy_yearOfBeginning) {
               filteredArray.push(student)
            }
         }
      }
      studentInDOM(filteredArray);
      filteredArray = [];
   }

   filterInput_fullName.addEventListener('input', (e) => {
      clearInterval(filteringDelay_fullName)
      filteringDelay_fullName = setTimeout(filterBy_name, 1000);
   });
   filterInput_faculty.addEventListener('input', (e) => {
      clearInterval(filteringDelay_faculty)
      filteringDelay_faculty = setTimeout(filterBy_faculty, 1000);
   });
   filterInput_yearOfBeginning.addEventListener('input', (e) => {
      clearInterval(filteringDelay_yearOfBeginning)
      filteringDelay_yearOfBeginning = setTimeout(filterBy_yearOfBeginning, 1000);
   });
   filterInput_yearOfGraduation.addEventListener('input', (e) => {
      clearInterval(filteringDelay_yearOfGraduation)
      filteringDelay_yearOfGraduation = setTimeout(filterBy_yearOfGraduation, 1000);
   });

   } filteringStudents();

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
   let birthMonth = dateOfBirth.getMonth()+1, birthDay = dateOfBirth.getDate();
   let age = todayYear - birthYear;
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
