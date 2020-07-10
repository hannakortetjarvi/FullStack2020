import React from 'react';

const Header = ({ course }) => <h2>{course.name}</h2>
  
const Total = ({ exercises }) => {
  const sum = exercises.reduce((s, p) => s + p)
  return <b>total of {sum} exercises</b>
}

const Content = ({ parts }) =>  <>{parts.map(part => <Part key={part.id} part={part}/>)}</>

const Part = ({ part }) => <p> {part.name} {part.exercises} </p>
  
/**
* Renders parts and the total of exercises of the course
* with the help of Header, Total, Content and Part -components
*/
const Course = ({ course }) => {
  return (
    <div>
      <Header course={course}/>
      <Content parts={course.parts}/>
      <Total exercises={course.parts.map(part => part.exercises)}/>
    </div>
  )
}

export default Course