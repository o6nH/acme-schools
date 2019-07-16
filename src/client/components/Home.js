import React from 'react';
import {Link} from 'react-router-dom';

const Home = (props) => {
  const {topSchool, popSchool} = props;
  if(topSchool && popSchool) {
    const {id:topId, name:topName, aveGPA:topGPA} = topSchool;
    const {id:popId, name:popName} = popSchool;
    const popCount = popSchool.students.length;
    return (
      <div>
      <h1>Welcome Home!</h1>
      {
        topSchool 
        ? <p>The top school is <Link to={`/schools/${topId}`}>{`${topName}`}</Link> with an average GPA of {`${topGPA}`}.</p> 
        : ''
      }
      {
        popSchool
        ? <p>The most popular school <Link to={`/schools/${popId}`}>{`${popName}`}</Link> with {`${popCount}`} students.</p>
        : ''
      }
    </div>
    )
  } else {
    return (
      <div>
        <h1>Welcome</h1>
        <p>There are no students enrolled and therefore no popular or top schools to display.</p>
      </div>
    )
  }
};

export default Home;