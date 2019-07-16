
import React, {Component} from 'react';
import {connect} from 'react-redux';
import StudentCard from './StudentCard';

// Component
class Students extends Component {
  render() {
    const students = this.props.students || [];
    return (
      <div>
        <h1> Students </h1>
        <ul>
          {
            students.length
            ? students.map(student => <li key={student.id}><StudentCard key={student.id} student={student} /></li>)
            : <p>There are no students. Add new students to re-render.</p>
          }
        </ul>
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