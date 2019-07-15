import React from 'react';
import {Link} from 'react-router-dom';

const Navbar = (props) => {
  const {topSchool, popSchool} = props;
  
  if(topSchool && popSchool) {
      const {id:topId, name:topName, aveGPA:topGPA} = topSchool;
      const {id:popId, name:popName} = popSchool;
      const popCount = popSchool.students.length;

  return (
    <ul>
      <li><Link to='/'>Home</Link></li>
      <li><Link to='/schools'>Schools ({`${props.schoolCount}`})</Link></li>
      <li><Link to='/students'>Students ({`${props.studentCount}`})</Link></li>
      <li><Link to={`/schools/${topId}`}>Top School - {`${topName}`} (GPA: {`${topGPA}`})</Link></li>
      <li><Link to={`/schools/${popId}`}>Most Popular School - {`${popName}`} ({`${popCount}`})</Link></li>
    </ul>
  )}
  else {
    return ('');
  }
};

export default Navbar;