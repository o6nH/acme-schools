import React from 'react';
import {connect} from 'react-redux';
import SchoolCard from './SchoolCard';
import {setSchoolStats} from '../store'; //Imported helper function

// React Functional Component
function Schools(props) {
  const {schools, detailedSchools} = props;
  return (
    <div className='d-flex-column align-items-center'>
      <h1 className='display-2 text-center'>Schools</h1>
      <div className='d-flex flex-wrap justify-content-center'>
      {
        //if student arrays were appended to school objects
        (detailedSchools.length && detailedSchools[0].students)
        ? detailedSchools.map(school => <SchoolCard key={school.id} school={school}/>)
        : schools.map(school => <SchoolCard  key={school.id} school={school}/>)
      }
      </div>
    </div>
  )
}

// Mappings of Redux State to This React Component
const mapToProps = (state) => ({
  schools: state.schools,
  detailedSchools: setSchoolStats(state.schools, state.students) //setSchoolStats returns schools if students don't get appended because students = []
});


export default connect(mapToProps)(Schools);