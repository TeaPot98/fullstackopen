import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';

import { changeNotification } from '../reducers/notificationReducer';
import { saveUser } from '../reducers/userReducer';

import blogService from '../services/blogs'
import loginService from '../services/login'

const LoginForm = () => {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    
    const dispatch = useDispatch()
    const navigate = useNavigate()  
    
    const setNotification = notification => {
        dispatch(changeNotification(notification, 3))
    }

    const handleLogin = async (event) => {
        event.preventDefault();

        try {
            const user = await loginService.login({
            username,
            password,
            });

            console.log("The sent user is >>>> ", user);

            window.localStorage.setItem("bloglist-user", JSON.stringify(user));
            blogService.setToken(user.token);
            dispatch(saveUser(user))
            setUsername("");
            setPassword("");
            navigate('/')
            setNotification({
            type: "success",
            message: `Successfully logged in as ${user.name}`,
            });
        } catch (error) {
            // Implement the error message ??
            setNotification({
            type: "error",
            message: `Login failed: ${error}`,
            });
            // console.error(error.response.data.error);
        }

        console.log(
            "Logging with: Username >>> ",
            username,
            " Password >>> ",
            password
        );
    };

    return (
        <form onSubmit={handleLogin}>
            <div>
            username
            <input
                type="text"
                value={username}
                name="Username"
                onChange={({ target }) => setUsername(target.value)}
            />
            </div>
            <div>
            password
            <input
                type="password"
                value={password}
                name="Password"
                onChange={({ target }) => setPassword(target.value)}
            />
            </div>
            <button type="submit">login</button>
        </form>
    )
}

export default LoginForm