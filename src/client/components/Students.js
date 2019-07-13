import React from 'react';
import {connect} from 'react-redux';
import {studentsInSchool} from '../store';

function Students(props) {
  const students = props.students || [];
  const enrolledStudents = props.enrolledStudents || [];
  
  return (
    <div>
      <h1>Students</h1>
      <ul>
        {
          enrolledStudents.length
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
  const {id} = ownProps.match.params;
  const {students} = state;
  const enrolledStudents = studentsInSchool(students, id);
  return {enrolledStudents}
};

export default connect(mapStateToProps)(Students)