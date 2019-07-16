import React, {Component} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import {selectSchool, setStudentsToSchool} from '../store'; // Imported Thunk Creators
import StudentCard from './StudentCard';
import StudentSelection from './StudentSelection';

// Component
class StudentsByCourse extends Component {
  render() {
    const {selectedSchool} = this.props;
    const enrolledStudents = this.props.enrolledStudents || [];

    return (
      <div>
        <h1>Students at {selectedSchool.name}</h1>
        <StudentSelection schoolId={this.props.schoolId}/>
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
      </div>
    )
  }
}

// Mapping From Redux Store's State to Component's Props
const mapStateToProps = (state, ownProps) => {
  const {schools, students} = state;
  const {id} = ownProps.match.params; 
  const selectedSchool = selectSchool(schools, id)[0] || {name: ''}; //Allows use of selectedSchool.name when selectedSchool = {} at startup, when schools = [];
  const enrolledStudents = setStudentsToSchool(students, id);
  return {schoolId: id, selectedSchool, students, enrolledStudents};
};

// Export of Store-Connected Container Component
export default connect(mapStateToProps)(StudentsByCourse)
