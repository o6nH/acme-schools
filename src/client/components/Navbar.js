import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
  const topSchool = props.topSchool || {id:'', name:'None', aveGPA:'N/A'};
  const popSchool = props.popSchool || {id: '', name:'None', students:[]};
  const {id:topId, name:topName, aveGPA:topGPA} = topSchool;
  const {id:popId, name:popName} = popSchool;
  const popCount = popSchool.students.length;
  return (
    <div>
      <h1>ACME SCHOOLS</h1>
      <ul>
        <li><Link to='/'>Home</Link></li>
        <li><Link to='/schools'>Schools ({`${props.schoolCount}`})</Link></li>
        <li><Link to='/students'>Students ({`${props.studentCount}`})</Link></li>
        {
          topId 
          ? <li><Link to={`/schools/${topId}`}>Top School{` - ${topName} (GPA: ${topGPA})`}</Link></li>
          : ''
        }
        {
          popId
          ? <li><Link to={`/schools/${popId}`}>Most Popular School{` - ${popName} (${popCount})`}</Link></li>
          : ''
        }
      </ul>
    </div>
  )
};

export default Navbar;