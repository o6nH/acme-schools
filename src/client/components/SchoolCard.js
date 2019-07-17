import React from 'react';
import {Link} from 'react-router-dom';
import StudentSelection from './StudentSelection';

const defaultImg = "https://upload.wikimedia.org/wikipedia/commons/thumb/7/7c/Go-home.svg/200px-Go-home.svg.png"

export default function Card({school}) {
  const {id, name, imageUrl} = school;
  const students = school.students || [];
  return (
    <div className='card d-flex align-items-center'>
      <Link to={`/schools/${id}`}>
      <div className='d-flex-column align-items-center text-center'>
        <h3 className='card-title display-5'>{name}</h3>
        <img className='card-img-top m-auto' src={imageUrl || defaultImg} alt={`Image of ${name}`} />
      </div>
      </Link>
      <div className='card-body d-flex-column align-items-center'>
        <p>{`Student Count: ${students.length}`}</p>
        {school.aveGPA ? <p>{`Average GPA: ${school.aveGPA}`}</p> : ''}
        {
          students.length > 0 
          ? <form>
            <label htmlFor='student'>Enrolled Students: </label>
            <br/>
            <select name='students'>
              <option value=''>-- View Students --</option>
              {
                students.map(({id, firstName, lastName}) => <option key={id} value={id}>{`${firstName} ${lastName}`}</option>)
              }
            </select>
          </form>
          : ''
        }
        <hr/>
        <StudentSelection schoolId={id}/>
      </div>
    </div>
  )
};
