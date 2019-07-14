import React from 'react';
import {Link} from 'react-router-dom';

export default function Schools(props) {
  const {schools} = props;
  return (
    <div>
      <h1>Schools</h1>
      <ul>
        {
          schools.map(school => <li key={school.id}><Link to={`/schools/${school.id}`}>{school.name}</Link></li>)
        }
      </ul>
    </div>
  )
}
