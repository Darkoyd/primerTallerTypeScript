import { Course } from './course.js';
import { Student } from './student.js'

import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';

let coursesTbody: HTMLElement = document.getElementById('courses')!;
let studentTbody: HTMLElement = document.getElementById('student')!;
const btnfilterByName: HTMLElement = document.getElementById("button-filterByName")!;
const btnFilterByCredits: HTMLElement = document.getElementById("button-filterByCredits")!;
const inputSearchBox: HTMLInputElement = <HTMLInputElement> document.getElementById("search-box")!;
const inputLowerCredit: HTMLInputElement = <HTMLInputElement> document.getElementById("lowerCredit")!;
const inputUpperCredit: HTMLInputElement = <HTMLInputElement> document.getElementById("upperCredit")!;
const totalCreditElm: HTMLElement = document.getElementById("total-credits")!;


btnfilterByName.onclick = () => applyFilterByName();
btnFilterByCredits.onclick = () => applyFilterByCredit();

renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);

totalCreditElm.innerHTML = `${getTotalCredits(dataCourses)}`


function renderCoursesInTable(courses: Course[]): void {
  console.log('Desplegando cursos');
  courses.forEach((course) => {
    let trElement = document.createElement("tr");
    trElement.innerHTML = `<td>${course.name}</td>
                           <td>${course.professor}</td>
                           <td>${course.credits}</td>`;
    coursesTbody.appendChild(trElement);
  });
}

function renderStudentInTable(student: Student): void {
  console.log('Desplegando estudiante')
  let trElement = document.createElement("tr")
  trElement.innerHTML = `<td>${student.code}</td>
                                          <td>${student.id}</td>
                                          <td>${student.age} años</td>
                                          <td>${student.address}</td>
                                          <td>${student.phone}</td>`
studentTbody.appendChild(trElement)
}

function applyFilterByName() {
  let text = inputSearchBox.value;
  text = (text == null) ? '' : text;
  clearCoursesInTable();
  let coursesFiltered: Course[] = searchCourseByName(text, dataCourses);
  renderCoursesInTable(coursesFiltered);
}

function applyFilterByCredit() {
  let lowerBound = inputLowerCredit.value
  let upperBound = inputUpperCredit.value
  let lowerBoundNum = 0
  let upperBoundNum = 0
  if (lowerBound === null) {
    alert('Por favor inserte un valor mínimo')
    throw new Error('Por favor inserte un valor mínimo')
  } else {
    lowerBoundNum = +lowerBound
  }
  if (upperBound === null) {
    alert('Por favor inserte un valor máximo')
    throw new Error('Por favor inserte un valor máximo')
  } else {
    upperBoundNum = +upperBound
  }
  clearCoursesInTable()
  let filtered: Course[] = searchCourseByCredits(lowerBoundNum, upperBoundNum, dataCourses)
  renderCoursesInTable(filtered);
}

function searchCourseByName(nameKey: string, courses: Course[]) {
  return nameKey === '' ? dataCourses : courses.filter( c =>
    c.name.match(nameKey));
}

function searchCourseByCredits(lowerBound: number, upperBound: number, courses: Course[]) {
  const res = courses.filter( c => {
    if (c.credits <= upperBound && c.credits >= lowerBound) {
      return c
    }
  })
  return res
}


function getTotalCredits(courses: Course[]): number {
  let totalCredits: number = 0;
  courses.forEach((course) => totalCredits = totalCredits + course.credits);
  return totalCredits;
}

function clearCoursesInTable() {
  while (coursesTbody.hasChildNodes()) {
    if (coursesTbody.firstChild != null) {
      coursesTbody.removeChild(coursesTbody.firstChild);
    }
  }
}