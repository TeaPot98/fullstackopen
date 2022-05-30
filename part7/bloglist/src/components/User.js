import React from 'react'
import { useSelector } from 'react-redux'
import {
    useParams
} from 'react-router-dom'

const User = () => {
    const id = useParams().id
    const user = useSelector(state => state.users.all.find(u => u.id === id))
    console.log('The users from User component >>> ', user)

    if (!user) {
        return null
    }
    
    return (
        <div>
            <h2>{user.name}</h2>
            <h4>added blogs</h4>
            <ul>
                {user.blogs.map(b => (
                    <li key={b.id}>
                        {b.title}
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default User