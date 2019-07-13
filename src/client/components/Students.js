import React from 'react'

export default function Students(props) {
  const {students} = props;
  return (
    <ul>
      {
        students.map(student => 
          <li key={student.id}>{student.firstName} {student.lastName}</li>
        )
      }
    </ul>
  )
}
