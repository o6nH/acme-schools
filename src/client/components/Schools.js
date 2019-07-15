import React from 'react';
import {connect} from 'react-redux';
import SchoolCard from './SchoolCard';
import {setSchoolStats} from '../store';

function Schools(props) {
  const {detailedSchools} = props;
  return (
    <div>
      <h1>Schools</h1>
      {
        (detailedSchools.length && detailedSchools[0].students) //if student arrays were appended to school objects
        ? 
        <ul>
          {
            detailedSchools.map(school => <li key={school.id}><SchoolCard school={school}/></li>)
          }
        </ul>
        :
        <ul>
          <p>Either there are no students or students weren't properly filtered by school.</p>
        </ul>
      }
      

      
    </div>
  )
}

const mapToProps = (state) => ({
  detailedSchools: setSchoolStats(state.schools, state.students) //setSchoolStats returns schools if students don't get appended because students = []
});


export default connect(mapToProps)(Schools);