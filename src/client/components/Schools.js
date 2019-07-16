import React from 'react';
import {connect} from 'react-redux';
import SchoolCard from './SchoolCard';
import {setSchoolStats} from '../store'; //Imported helper function

// React Functional Component
function Schools(props) {
  const {schools, detailedSchools} = props;
  return (
    <div>
      <h1>Schools</h1>
      {
        //if student arrays were appended to school objects
        (detailedSchools.length && detailedSchools[0].students)
        ? 
        <ul>
          {
            detailedSchools.map(school => <li key={school.id}><SchoolCard school={school}/></li>)
          }
        </ul>
        :
        <ul>
          <p>Either there are no students or students weren't properly filtered by school.</p>
          {
            schools.map(school => <li key={school.id}><SchoolCard school={school}/></li>)
          }
        </ul>
      }
    </div>
  )
}

// Mappings of Redux State to This React Component
const mapToProps = (state) => ({
  schools: state.schools,
  detailedSchools: setSchoolStats(state.schools, state.students) //setSchoolStats returns schools if students don't get appended because students = []
});


export default connect(mapToProps)(Schools);