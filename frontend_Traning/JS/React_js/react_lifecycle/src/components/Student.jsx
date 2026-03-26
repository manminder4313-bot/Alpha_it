import React from 'react'

function Student({ props}) {
    console.log("Props received in student component:", props);
  return (
    <div>
      <h2>Student Name</h2>
      <p>Name: {props.name}</p>
      <p>Age: {props.age}</p> 
    </div>
  );
}

export default Student;
