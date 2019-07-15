import React from 'react';
import {connect} from 'react-redux';
import {selectSchool, studentsInSchool} from '../store';

// Functional Component 
/* Contains logic for two differnt views depending on Route's match.params.id) */
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

// Mapping From Redux Store's State to Functional Component's Props
const mapStateToProps = (state, ownProps) => {
  const {schools, students} = state;
  const {id} = ownProps.match.params;
  const selectedSchool = selectSchool(schools, id)[0] || {name: ''}; //Since I'm using selectedSchool.name and {}.name should crash at startup when schools = []
  const enrolledStudents = studentsInSchool(students, id);
  return {selectedSchool, students, enrolledStudents}
};

// Export of Store-Connected Container Component
export default connect(mapStateToProps)(Students)