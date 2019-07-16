import {createStore, combineReducers, applyMiddleware} from 'redux';
import loggingMiddleware from 'redux-logger';
import thunksMiddleware from 'redux-thunk';
import axios from 'axios';

// Actions
const Act = {
  GET_STUDENTS: 'GET_STUDENTS',
  CREATE_NEW_STUDENT: 'CREATE_NEW_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  GET_SCHOOLS: 'GET_SCHOOLS',
}

// Exportable Helper Functions
export const selectSchool = (schools, schoolId) => 
  schools.filter(school => school.id === schoolId);

export const setStudentsToSchool = (students, schoolId) => 
  students.filter(student => student.schoolId === schoolId);

export const getUnenrolledStudents = (students) => 
  students.filter(student => student.schoolId === null || students.schoolId === '');

const calcAveGPA = (students) => 
  students.reduce((aveGPA, student, index) => {
    aveGPA = Math.round(100*(aveGPA*index + Number(student.gpa))/(index+1))/100;
    return aveGPA;
  }, 0);

export const setSchoolStats = (schools, students) => {
  if(schools.length && students.length) {
    return schools.map(school => {
      const enrolled = setStudentsToSchool(students, school.id);
      const aveGPA = calcAveGPA(enrolled);
      return {
        ...school, 
        students: enrolled,
        aveGPA
      }
    })
  } else {
    return schools;
  }
};

export const getTopSchool = (schools, students) => {
  if(schools.length && students.length) {
    schools = setSchoolStats(schools, students);    
    const topSchool = schools.reduce((maxGPASchool, school) => {
      return school.aveGPA > maxGPASchool.aveGPA
      ? school : maxGPASchool
    }, {aveGPA: 0});
    return topSchool;
  }
};

export const getPopSchool = (schools, students) => {
  if(schools.length && students.length){
    schools = setSchoolStats(schools, students);
    const popSchool = schools.reduce((maxCountSchool, school) => {
      maxCountSchool = school.students.length > maxCountSchool.students.length
      ? school : maxCountSchool;
      return maxCountSchool;
    }, {students: []})
    return popSchool;
  } 
};

// Thunk Creators
/* I've included axios as a third parameter in case I decide to move creators out of store file and into their own file; it'll allow use in components without having to import axios into sepearate file creators file because axios (here) is passed to thunkMiddleware in store creator (i.e., thunkMiddle.withExtraArgument(axios)). */
export const fetchSchools = () => (dispatch, getState, axios) => {
  axios.get('/api/schools')
    .then(({data:schools}) => dispatch({type: Act.GET_SCHOOLS, schools}))
    .catch(err => console.error(err));
};

export const fetchStudents = () => (dispatch, getState, axios) => {
  axios.get('/api/students')
    .then(({data:students}) => dispatch({type: Act.GET_STUDENTS, students}))
    .catch(err => console.error(err));
};

export const createStudent = (newStudent) => (dispatch, getState, axios) => {
  axios.post('/api/students', newStudent)
    .then(({data:student}) => dispatch({type: Act.CREATE_NEW_STUDENT, student}))
    .catch(err => console.error(err));
}

export const deleteStudent = (studentId) => (dispatch, getState, axios) => {
  axios.delete(`/api/students/${studentId}`)
    .then(() => dispatch({type: Act.DELETE_STUDENT, studentId}))
    .catch(err => console.error(err));
}

export const updateStudent = (id, updateObj) => (dispatch, getState, axios) => {
  axios.put(`/api/students/${id}`, updateObj)
    .then(({data:student}) => dispatch({type: Act.UPDATE_STUDENT, student}))
    .catch(err => console.error(err))
};

// Reducers (with init states)
const schoolReducer = (state = [], action) => {
  switch (action.type) {
    case Act.GET_SCHOOLS:
      return action.schools;
    default:
      return state;
  }
};

const studentReducer = (state = [], action) => {
  switch(action.type) {
    case Act.CREATE_NEW_STUDENT:
      return [action.student, ...state];
    case Act.GET_STUDENTS:
      return action.students;
    case Act.DELETE_STUDENT:
      return state.filter(student => student.id !== action.studentId);
    case Act.UPDATE_STUDENT:
      /* Reorders (bad)
      const filteredStateCopy = state.filter(student => student.id !== action.student.id);
      return [action.student, ...filteredStateCopy];
      */
      return state.map(student => (student.id === action.student.id) ? action.student : student);
    default:
      return state;
  }
};

// Store (with combined reducers and middlewares)
export default createStore(
  combineReducers({schools: schoolReducer, students: studentReducer}), 
  applyMiddleware(loggingMiddleware, thunksMiddleware.withExtraArgument(axios))
);