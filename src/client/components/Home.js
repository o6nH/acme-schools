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
      <p>
        The top school is <Link to={`/schools/${topId}`}>{`${topName}`}</Link> with an average GPA of {`${topGPA}`}.
      </p>
      <p>
        The most popular school <Link to={`/schools/${popId}`}>{`${popName}`}</Link> with {`${popCount}`} studendts.
      </p>
    </div>
  )}
  else {
    return ('');
  }
};

export default Home;