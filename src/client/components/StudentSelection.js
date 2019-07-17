import React, {Component} from 'react';
import {connect} from 'react-redux';
import {getUnenrolledStudents, updateStudent} from '../store'; // Imported Thunk Creators

class StudentSelection extends Component {
  constructor(props){
    super(props);
    this.state = {
      transferringStudentId:''
    };
    this.handleTransfer = this.handleTransfer.bind(this);
  }

  handleTransfer(event, schoolId){
    event.preventDefault();
    const transferringStudentId = event.target.value;
    this.props.updateStudent(transferringStudentId, {schoolId});
    this.setState({transferringStudentId:''});
    window.location.hash = `#/schools/${schoolId}`;
  }

  render(){
    const {handleTransfer} = this;
    const {transferringStudentId} = this.state;
    const unenrolledStudents = this.props.unenrolledStudents || [];
    const selectedSchoolId = this.props.schoolId; 

    return(
      unenrolledStudents.length > 0
      ? 
      <div className='text-center'>
        <form id='enrolling-form'>
        <label htmlFor='transferringStudentId'>Enroll a Student: </label>
        <br/>
        <select name='transferringStudentId' value={transferringStudentId} onChange={(event) => handleTransfer(event, selectedSchoolId)}>
        <option value=''>-- Unenrolled Student --</option>
        {
    unenrolledStudents.map(student => <option key={student.id} value={student.id}>{student.firstName} {student.lastName}</option>)
        }
        </select>
        </form>
      </div>
      : ''
    )
  }
};

// Mapping From Redux Store's State to Component's Props
const mapStateToProps = (state) => {
  const {students} = state;
  const unenrolledStudents = getUnenrolledStudents(students);
  return {unenrolledStudents};
};

const mapDispatchToProps = dispatch => ({
  updateStudent: (studentId, studentUpdatesObj) => dispatch(updateStudent(studentId, studentUpdatesObj))
});

// Export of Store-Connected Container Component
export default connect(mapStateToProps, mapDispatchToProps)(StudentSelection)