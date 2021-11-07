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

const Click = () => {
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    setLeft(left + 1)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    setRight(right + 1)
  }

  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text="left"/>
      <Button onClick={handleRightClick} text="right"/>
      {right}
      <History allClicks={allClicks}/>
    </div>
  )
}

const History = (props) => {
  if (props.allClicks.length === 0) {
    return (
      <div>
        the app is used by pressing the buttons
      </div>
    )
  }
  return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

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
      <Click/>
    </div>
  )
}

export default App
