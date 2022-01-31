import React from 'react'
import { connect } from 'react-redux'
import { createAnectode } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'

const AnecdoteForm = (props) => {
    const addAnectode = async event => {
        event.preventDefault()
        const content = event.target.anectode.value
        event.target.anectode.value = ''
        props.setNotification(`added anecdote '${content}'`, 2)
        props.createAnectode(content)
      }

      return (
          <div>
            <h2>create new</h2>
            <form onSubmit={addAnectode}>
                <div><input 
                name='anectode'
                /></div>
                <button type='submit'>create</button>
            </form>
          </div>
      )
}

const mapDispatchToProps = {
  createAnectode,
  setNotification
}

export default connect(
  null,
  mapDispatchToProps
)(AnecdoteForm)