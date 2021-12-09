import React, {useState, useEffect} from 'react'
import numberService from './services/numbers'
import Notification from './components/Notification'

const App = () => {
  const [numbers, setNumbers] = useState([])
  const [newName, setNewName] = useState('')
  const [newPhoneNumber, setNewPhoneNumber] = useState('')
  const [searchString, setSearchString] = useState('')
  const [notification, setNotification] = useState(null)

  // Fetching data from json-server
  useEffect(() => {
    numberService
      .getAll()
      .then(initialNumbers => {
        const numbersData = initialNumbers
        setNumbers(numbersData)
      })
  }, [])

  // Adding new number
  const addNumber = event => {
    event.preventDefault()
    console.log('button clicked !')

    const nameAlreadyAdded = numbers.some(person => person.name === newName)

    if (nameAlreadyAdded && window.confirm(`${newName} is already added to phonebook, replace the old number with a new one ?`)) {
      const number = numbers.find(person => person.name === newName)
      const newNumber = {...number, number: newPhoneNumber}

      numberService
        .update(number.id, newNumber)
        .then(returnedNumber => {
          setNumbers(numbers.map(n => n.id !== returnedNumber.id ? n : returnedNumber))
          setNewName('')
          setNewPhoneNumber('')
          setNotification(
            {
              message: `Updated ${returnedNumber.name}`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    } else {
      const newNumber = {
        name: newName,
        number: newPhoneNumber,
      }

      numberService
        .create(newNumber)
        .then(returnedNumber => {
          setNumbers(numbers.concat(returnedNumber))
          setNewName('')
          setNewPhoneNumber('')
          setNotification(
            {
              message: `Updated ${returnedNumber.name}`,
              type: 'success'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
        .catch(error => console.log(error))
    }
  }

  // Deleting number by id
  const deleteNumber = id => {
    if (window.confirm(`Delete ${numbers.find(n => n.id === id).name} ?`)) {
      numberService
        .remove(id)
        .then(response => {
          console.log(response)
          setNumbers(numbers.filter(number => number.id !== id))
        })
        .catch(error => {
          console.log(error)
          setNotification(
            {
              message: `Information of ${numbers.find(n => n.id === id).name} has already been removed from server`,
              type: 'error'
            }
          )
          setTimeout(() => {
            setNotification(null)
          }, 4000)
        })
    }
  }
  
  const numbersToShow = searchString === '' ? numbers : numbers.filter(person => person.name.toLowerCase().includes(searchString.toLowerCase()))

  const handleSearch = event => {
    setSearchString(event.target.value)
    console.log(event.target.value)
  }

  const handleNameChange = event => {
    setNewName(event.target.value)
    console.log(event.target.value)
  }

  const handleNumberChange = event => {
    setNewPhoneNumber(event.target.value)
    console.log(event.target.value)
  }

  return (
    <div>
      <h2>Phonebook</h2>
      <Notification notification={notification} />
      <Filter value={searchString} onChange={handleSearch} />
      <h3>Add a new</h3>
      <NumberForm addNumber={addNumber} newName={newName} newNumber={newPhoneNumber} handleNameChange={handleNameChange} handleNumberChange={handleNumberChange} />
      <h3>Numbers</h3>
      <Numbers numbersToShow={numbersToShow} deleteNumber={deleteNumber} />
    </div>
  )
}

const Filter = ({value, onChange}) => {
 return (
  <div>
    filter shown with <input value={value} onChange={onChange} />
  </div>
 )
}

const NumberForm = ({addNumber, newName, newNumber, handleNameChange, handleNumberChange}) => (
  <form onSubmit={addNumber}>
        <div>
          name: <input value={newName} onChange={handleNameChange} />
        </div>
        <div>
          number: <input value={newNumber} onChange={handleNumberChange} />
        </div>
        <div>
          <button type="submit">add</button>
        </div>
      </form>
)

const Numbers = ({numbersToShow, deleteNumber}) => (
  <ul>
    {numbersToShow.map(number => 
      <li key={number.id}>
        {number.name} {number.number} 
        <button onClick={() => deleteNumber(number.id)}>delete</button>
      </li>)}
  </ul>
)

export default App