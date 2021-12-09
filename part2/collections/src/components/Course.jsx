import React from 'react'
import {nanoid} from 'nanoid'

const Header = ({course}) => {
    // console.log(props)
    return (
        <>
        <h1>{course.name}</h1>
        </>
    ) 
}
  
const Content = ({course}) => {
    // console.log(props)
    return (
      <>
        {course.parts.map(part => <Part key={nanoid()} paragraph={part}/>)}
      </>
    )
}
  
const Part = ({paragraph}) => {
    return (
      <>
        <p>{paragraph.name} {paragraph.exercises}</p>
      </>
    )
}
  
const Total = ({parts}) => {
    let sum = parts.reduce((a, b) => {
        return {exercises: a.exercises + b.exercises}
    })
    console.log(sum)
    return (
        <>
        <p><strong>total of {sum.exercises} exercises</strong></p>
      </>
    )
}

const Course = ({course}) => {
    console.log(course)
    return (
        <div>
            <Header course={course}/>
            <Content course={course}/>
            <Total parts={course.parts}/>
        </div>
    )
}

export default Course