import { dataCourses } from './dataCourses.js';
import { dataStudent } from './dataStudent.js';
var coursesTbody = document.getElementById('courses');
var studentTbody = document.getElementById('student');
var btnfilterByName = document.getElementById("button-filterByName");
var btnFilterByCredits = document.getElementById("button-filterByCredits");
var inputSearchBox = document.getElementById("search-box");
var inputLowerCredit = document.getElementById("lowerCredit");
var inputUpperCredit = document.getElementById("upperCredit");
var totalCreditElm = document.getElementById("total-credits");
btnfilterByName.onclick = function () { return applyFilterByName(); };
btnFilterByCredits.onclick = function () { return applyFilterByCredit(); };
renderCoursesInTable(dataCourses);
renderStudentInTable(dataStudent);
totalCreditElm.innerHTML = "" + getTotalCredits(dataCourses);
function renderCoursesInTable(courses) {
    console.log('Desplegando cursos');
    courses.forEach(function (course) {
        var trElement = document.createElement("tr");
        trElement.innerHTML = "<td>" + course.name + "</td>\n                           <td>" + course.professor + "</td>\n                           <td>" + course.credits + "</td>";
        coursesTbody.appendChild(trElement);
    });
}
function renderStudentInTable(student) {
    console.log('Desplegando estudiante');
    var trElement = document.createElement("tr");
    trElement.innerHTML = "<td>" + student.code + "</td>\n                                          <td>" + student.id + "</td>\n                                          <td>" + student.age + " a\u00F1os</td>\n                                          <td>" + student.address + "</td>\n                                          <td>" + student.phone + "</td>";
    studentTbody.appendChild(trElement);
}
function applyFilterByName() {
    var text = inputSearchBox.value;
    text = (text == null) ? '' : text;
    clearCoursesInTable();
    var coursesFiltered = searchCourseByName(text, dataCourses);
    renderCoursesInTable(coursesFiltered);
}
function applyFilterByCredit() {
    var lowerBound = inputLowerCredit.value;
    var upperBound = inputUpperCredit.value;
    var lowerBoundNum = 0;
    var upperBoundNum = 0;
    if (lowerBound === null) {
        alert('Por favor inserte un valor mínimo');
        throw new Error('Por favor inserte un valor mínimo');
    }
    else {
        lowerBoundNum = +lowerBound;
    }
    if (upperBound === null) {
        alert('Por favor inserte un valor máximo');
        throw new Error('Por favor inserte un valor máximo');
    }
    else {
        upperBoundNum = +upperBound;
    }
    clearCoursesInTable();
    var filtered = searchCourseByCredits(lowerBoundNum, upperBoundNum, dataCourses);
    renderCoursesInTable(filtered);
}
function searchCourseByName(nameKey, courses) {
    return nameKey === '' ? dataCourses : courses.filter(function (c) {
        return c.name.match(nameKey);
    });
}
function searchCourseByCredits(lowerBound, upperBound, courses) {
    var res = courses.filter(function (c) {
        if (c.credits <= upperBound && c.credits >= lowerBound) {
            return c;
        }
    });
    return res;
}
function getTotalCredits(courses) {
    var totalCredits = 0;
    courses.forEach(function (course) { return totalCredits = totalCredits + course.credits; });
    return totalCredits;
}
function clearCoursesInTable() {
    while (coursesTbody.hasChildNodes()) {
        if (coursesTbody.firstChild != null) {
            coursesTbody.removeChild(coursesTbody.firstChild);
        }
    }
}
