import React, {useState} from 'react'

const Header = (props) => {
  console.log(props)
  return (
    <>
      <h1>{props.course}</h1>
    </>
  ) 
}

const Content = (props) => {
  console.log(props)
  return (
    <>
      <Part paragraph={props.content[0]}/>
      <Part paragraph={props.content[1]}/>
      <Part paragraph={props.content[2]}/>
    </>
  )
}

const Part = (props) => {
  console.log(props)
  return (
    <>
      <p>{props.paragraph.name} {props.paragraph.exercises}</p>
    </>
  )
}

const Total = (props) => {
  console.log(props)
  let sum = 0;
  props.content.forEach(part => {
    sum += part.exercises;
  })
  return (
    <>
      <p>Number of exercises {sum}</p>
    </>
  )
}

const Counter = () => {
  const [counter, setCounter] = useState(0)

  const increaseByOne = () => setCounter(counter + 1)
  const decreaseByOne = () => setCounter(counter - 1)
  const setToZero = () => setCounter(0)

  return (
    <>
      <Display counter={counter}/>
      <Button onClick={increaseByOne} text="Plus"/>
      <Button onClick={setToZero} text="Reset"/>
      <Button onClick={decreaseByOne} text="Minus"/>
    </>
  )
}

const Display = ({counter}) => <div>{counter}</div>


const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

const App = () => {
  const course = 'Half Stack application development'
  const parts = [
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
  

  return (
    <div>
      <Header course={course}/>
      <Content content={parts}/>
      <Total content={parts}/>
      <Counter/>
    </div>
  )
}

export default App
