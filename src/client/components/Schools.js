import React from 'react'

export default function Schools(props) {
  const {schools} = props;
  return (
    <div>
      <h1>Schools</h1>
      <ul>
        {
          schools.map(school => 
            <li key={school.id}>{school.name}</li>
          )
        }
      </ul>
    </div>
  )
}
