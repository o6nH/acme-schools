
import React, {Component} from 'react';
import {connect} from 'react-redux';
import StudentCard from './StudentCard';

// Component
class Students extends Component {
  render() {
    const students = this.props.students || [];
    return (
      <div className='d-flex-column align-items-center'>
        <h1 className='display-3 text-center'> Students </h1>
        <p className='text-center'> This is a view of all the student in the system.</p>
        <p className='text-center'> Caution: Clicking on the select menu, will automatically update school student's school.</p>
        <div className='d-flex flex-wrap justify-content-center'>
        {
          students.length
          ? students.map(student => <StudentCard key={student.id} student={student} />)
          : <p>There are no students. Add new students to re-render.</p>
        }
        </div>
      </div>
    )
  }
}

// Mapping From Redux Store's State to Component's Props
const mapStateToProps = (state, ownProps) => {
  const {students} = state;
  return {students};
};

// Export of Store-Connected Container Component
export default connect(mapStateToProps)(Students)