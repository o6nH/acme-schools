import {createStore, combineReducers, applyMiddleware} from 'redux';
import loggingMiddleware from 'redux-logger';
import thunksMiddleware from 'redux-thunk';
import axios from 'axios';

// Actions
const Act = {
  GET_STUDENTS: 'GET_STUDENTS',
  GET_STUDENT: 'GET_STUDENT',
  CREATE_NEW_STUDENT: 'CREATE_NEW_STUDENT',
  UPDATE_STUDENT: 'UPDATE_STUDENT',
  DELETE_STUDENT: 'DELETE_STUDENT',
  GET_SCHOOLS: 'GET_SCHOOLS',
  GET_TOP_SCHOOL: 'GET_TOP_SCHOOL',
  GET_POP_SCHOOL: 'GET_POP_SCHOOL',
}

// HelperFunctions
const studentsInSchool = (students, schoolId) =>
  students.filter(student => student.schoolId === schoolId);

const calcAveGPA = (students) => 
  students.reduce((aveGPA, student, index) => {
    aveGPA = Math.round(100*(aveGPA*index + Number(student.gpa))/(index+1))/100;
    return aveGPA;
  }, 0);

const setStudentStats = (schools, students) => {
  if(schools.length && students.length) {
    return schools.map(school => {
      const enrolled = studentsInSchool(students, school.id);
      const aveGPA = calcAveGPA(enrolled);
      return {
        ...school, 
        students: enrolled,
        aveGPA
      }
    })
  }
};

//Initial State
const initState = {
  schools: [],
  students: [],
  topSchool: {},
  popSchool: {}
}

//Thunk Creators
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

export const getPopSchool = (schools, students) => {
  if(schools.length && students.length){
    schools = setStudentStats(schools, students);
    const popSchool = schools.reduce((maxCountSchool, school) => {
      maxCountSchool = school.students.length > maxCountSchool.students.length
      ? school : maxCountSchool;
      return maxCountSchool;
    }, {students: []})
    console.log('popSchool from getPopSchool:', popSchool)
    return popSchool;
  }
};

export const getTopSchool = (schools, students) => {
  if(schools.length && students.length) {
    schools = setStudentStats(schools, students);    
    const topSchool = schools.reduce((maxGPASchool, school) => {
      return school.aveGPA > maxGPASchool.aveGPA
      ? school : maxGPASchool
    }, {aveGPA: 0});
    console.log('topSchool from getTopSchool:', topSchool)
    return topSchool;//{}
  }
};

//Reducers
const reducer = (state = initState, action) => {
  switch (action.type) {
    case Act.GET_SCHOOLS:
      return {...state, schools: action.schools};
    case Act.GET_STUDENTS:
      return {...state, students: action.students};
    default:
      return state;
  }
};


export default createStore(reducer, applyMiddleware(loggingMiddleware, thunksMiddleware.withExtraArgument(axios)));