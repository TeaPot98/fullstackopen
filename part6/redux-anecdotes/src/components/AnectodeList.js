import React from 'react'
import { useSelector,useDispatch } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { setNotification, removeNotification } from '../reducers/notificationReducer'
import Filter from './Filter'

const AnecdoteList = () => {
    const anecdotes = useSelector(state => state.anecdotes)
    const filter = useSelector(state => state.filter)
    const dispatch = useDispatch()

    const vote = anecdote => {
        dispatch(voteAnecdote({
            ...anecdote,
            votes: anecdote.votes + 1
        }))
        dispatch(setNotification(`you voted '${anecdote.content}'`, 3))
        console.log('vote', anecdote.id)
    }
    
    let anecdotesToShow = anecdotes.slice().sort((a, b) => b.votes - a.votes)

    if (filter !== '') {
        anecdotesToShow = anecdotesToShow.filter(a => a.content.toLowerCase().includes(filter.toLowerCase()))
    }


    return (
        <div>
            <h2>Anecdotes</h2>
            <Filter />
            {anecdotesToShow.map(anecdote =>
                <div key={anecdote.id}>
                <div>
                    {anecdote.content}
                </div>
                <div>
                    has {anecdote.votes}
                    <button onClick={() => vote(anecdote)}>vote</button>
                </div>
                </div>
            )}
        </div>
    )
}

export default AnecdoteList