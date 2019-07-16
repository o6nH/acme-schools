import React from 'react';
import {NavLink} from 'react-router-dom';

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
        <li><NavLink to='/'>Home</NavLink></li>
        <li><NavLink to='/schools'>Schools ({`${props.schoolCount}`})</NavLink></li>
        <li><NavLink to='/students'>Students ({`${props.studentCount}`})</NavLink></li>
        {
          topId 
          ? <li><NavLink to={`/schools/${topId}`}>Top School{` - ${topName} (GPA: ${topGPA})`}</NavLink></li>
          : ''
        }
        {
          popId
          ? <li><NavLink to={`/schools/${popId}`}>Most Popular School{` - ${popName} (${popCount})`}</NavLink></li>
          : ''
        }
      </ul>
    </div>
  )
};

export default Navbar;