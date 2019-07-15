import React from 'react';
import {Link} from 'react-router-dom';

const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Go-home.svg/200px-Go-home.svg.png"

export default function Card({school}) {
  const {id, name, imageUrl} = school;
  const students = school.students || [];
  return (
    <div>
      <Link to={`/schools/${id}`}>
        <img height='90' src={imageUrl || defaultImg} alt={`Image of ${name}`} />
        <h2>{name}</h2>
      </Link>
      <p>{`Student Count: ${students.length}`}</p>
      <p>{`Average GPA: ${school.aveGPA}`}</p>
      <form>
        <label htmlFor='student'>Enrolled Students: </label>
        <br/>
        <select name='students'>
          <option value=''>-- Select Student to View --</option>
          {
            students.map(({id, firstName, lastName}) => <option key={id} value={id}>{`${firstName} ${lastName}`}</option>)
          }
        </select>
      </form>
    </div>
  )
};
