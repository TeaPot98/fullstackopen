import React from 'react'

const Header = ({course}) => (
  <h1>{course.name}</h1>
)

const Content = ({course}) => {
  return (
    <>
      {course.parts.map((part, i) => <Part key={i + 1} name={part.name} exercises={part.exercises} />)}
    </>
  )
}

const Part = ({name, exercises}) => <p key={name}>{name} {exercises}</p>

const Total = ({course}) => {
  let sum = 0;
  course.parts.map(part => sum += part.exercises)

  return <p>Number of exercises {sum}</p>
}


const App = () => {
  const course = {
    name: 'Half Stack application development',
    parts: [
      {
        name: 'Fundamentals of React',
        exercises: 10
      },
      {
        name: 'Using props to pass data',
        exercises: 7
      },
      {
        name: 'State of a component',
        exercises: 14
      }
    ]
  }

  return (
    <div>
      <Header course={course} />
      <Content course={course} />
      <Total course={course} />
    </div>
  )
}

export default App;
