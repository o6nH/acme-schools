import React from 'react';
import {connect} from 'react-redux';
import {selectSchool, studentsInSchool} from '../store';

function Students(props) {
  const {selectedSchool, match} = props;
  const selectedSchoolId = match.params.id || '';
  const students = props.students || [];
  const enrolledStudents = props.enrolledStudents || [];
  
  return (
    <div>
      <h1>Students {selectedSchoolId && match.path === '/schools/:id' ? ` at ${selectedSchool.name}` : ''}</h1>
      <ul>
        {
          selectedSchoolId && match.path === '/schools/:id'
          ? enrolledStudents.map(student => 
              <li key={student.id}>{student.firstName} {student.lastName}</li>
            )
          : students.map(student => 
              <li key={student.id}>{student.firstName} {student.lastName}</li>
          )
        }
      </ul>
    </div>
  )
}

const mapStateToProps = (state, ownProps) => {
  const {schools, students} = state;
  const {id} = ownProps.match.params;
  const selectedSchool = selectSchool(schools, id)[0];
  const enrolledStudents = studentsInSchool(students, id);
  return {selectedSchool, students, enrolledStudents}
};

export default connect(mapStateToProps)(Students)