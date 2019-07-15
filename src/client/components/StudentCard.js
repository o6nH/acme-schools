import React from 'react';
import {connect} from 'react-redux';
import {deleteStudent} from '../store';

const defaultImg = "https://cdn.pixabay.com/photo/2014/04/03/10/41/person-311131_1280.png"

function Card(props) {
  const {student, schools} = props
  return (
    <div>
      <h2>{student.name}</h2>
      <img height='80' src={student.imageUrl || defaultImg} alt={`Image of ${student.firstName}`} />
      <p>{`${student.firstName} ${student.lastName}`}</p>
      <p>{`GPA: ${student.gpa}`}</p>
      <form>
        <label htmlFor='school'>School: </label>
        <br/>
        <select name='school' defaultValue={student.schoolId}>
          <option value=''>-- Select New School --</option>
          {
            schools.map(school => <option key={school.id} value={school.id}>{school.name}</option>)
          }
        </select>
      </form>
    </div>
  )
};

const mapToProps = (state) => ({schools:state.schools});

export default connect(mapToProps)(Card);