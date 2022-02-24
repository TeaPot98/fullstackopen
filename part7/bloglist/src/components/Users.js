import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { getAllUsers } from '../reducers/userReducer'

const Users = () => {
    const users = useSelector(state => state.users.all)

    return (
        <div>
            <h2>Users</h2>
            <span>
                {/* <br/> */}
                <h4>blogs created</h4>
                {users.map(u => (
                    <div key={u.id}>
                        <Link to={`/users/${u.id}`}>{u.name}</Link> 
                        {u.blogs.length}
                    </div>
                ))}
            </span>
            <span>
            </span>
        </div>
    )
}

export default Users