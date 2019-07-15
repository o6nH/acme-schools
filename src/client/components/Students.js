import React from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectSchool, setStudentsToSchool} from '../store'; // Imported Thunk Creators
import StudentCard from './StudentCard';

// Functional Component
/* Contains logic for two differnt views depending on Route's match.params.id) */
function Students (props) {
  //render(){
    const {selectedSchool, match} = props;
    const students = props.students || [];
    const enrolledStudents = props.enrolledStudents || [];
    const selectedSchoolId = match.params.id || '';
    
    return (
      <div>
        {/* If no school selected, needs selectedSchool === {name:''} */}
        <h1>
          Students 
          {
            selectedSchoolId && match.path === '/schools/:id' 
            ? ` at ${selectedSchool.name}` 
            : ''
          }
        </h1>
          {
            selectedSchoolId && match.path === '/schools/:id' 
            ?
            <ul>
              {
                enrolledStudents.length > 0 
                ? enrolledStudents.map(student => 
                    <li key={student.id}><StudentCard student={student} /></li>
                  )
                : 
                <div>
                  <p>There are no students enrolled at {selectedSchool.name}.</p>
                  <p>To view all students, <Link to='/students'>click here</Link></p>
                  <p>To view all schools, <Link to='/schools'>click here</Link></p>
                </div>
              }
            </ul>
            : //match.path === '/students'
            <ul>
              {
                students.length
                ? students.map(student => <li key={student.id}><StudentCard student={student} /></li>)
                : <p>There are no students. Add new students to re-render.</p>
              }
            </ul>
          }
      </div>
    )
  //}
}

// Mapping From Redux Store's State to Functional Component's Props
const mapStateToProps = (state, ownProps) => {
  const {schools, students} = state;
  const {id} = ownProps.match.params; 
  const selectedSchool = selectSchool(schools, id)[0] || {name: ''}; //Since I'm using selectedSchool.name and {}.name should crash at startup when schools = []
  const enrolledStudents = setStudentsToSchool(students, id);
  return {selectedSchool, students, enrolledStudents}
};

// Export of Store-Connected Container Component
export default connect(mapStateToProps)(Students)