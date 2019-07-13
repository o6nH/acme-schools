import React from 'react'

export default function Schools(props) {
  const {schools} = props;
  return (
    <ul>
      {
        schools.map(school => 
          <li key={school.id}>{school.name}</li>
        )
      }
    </ul>
  )
}
