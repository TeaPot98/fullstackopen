/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import BlogForm from './components/BlogForm'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [notification, setNotification] = useState(null)

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('bloglist-user')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      console.log(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })

      console.log('The sent user is >>>> ', user)

      window.localStorage.setItem(
        'bloglist-user', JSON.stringify(user)
      )
      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
      setNotification({
        type: 'success',
        message: `Successfully logged in as ${user.name}`
      })
      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      // Implement the error message ??
      setNotification({
        type: 'error',
        message: `Login failed: ${error.response.data.error}`
      })
      console.error(error.response.data.error)
    }

    console.log('Logging with: Username >>> ', username, ' Password >>> ', password)
  }

  const handleLogout = () => {
    window.localStorage.removeItem('bloglist-user')
    setUser(null)
  }



  const removeBlog = async blogObject => {
    try {
      if (window.confirm(`Remove blog ${blogObject.title} by ${blogObject.author}`)) {
        await blogService.remove(blogObject.id)
        setBlogs(blogs.filter(b => b.id !== blogObject.id))
      }
    } catch (error) {
      console.log(error)
    }
  }

  const loginForm = () => (
    <Togglable buttonLabel='log in'>
      <form onSubmit={handleLogin}>
        <div>
          username
          <input
            type="text"
            id="username"
            value={username}
            name="Username"
            onChange={({ target }) => setUsername(target.value)}
          />
        </div>
        <div>
          password
          <input
            type="password"
            id="password"
            value={password}
            name="Password"
            onChange={({ target }) => setPassword(target.value)}
          />
        </div>
        <button type="submit" id="login-button">login</button>
      </form>
    </Togglable>
  )

  const blogFormRef = useRef()

  const blogForm = () => (
    <Togglable buttonLabel='new blog' ref={blogFormRef}>
      <BlogForm createBlog={addBlog}/>
    </Togglable>
  )

  const addBlog = async blogObject => {
    blogFormRef.current.toggleVisibility()

    try {
      const returnedBlog = await blogService.create(blogObject)
      console.log('Returned blog from "addBlog" function >>> ', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))

      setNotification({
        type: 'success',
        message: `Successfully added blog "${returnedBlog.title}"`
      })


      setTimeout(() => {
        setNotification(null)
      }, 5000)
    } catch (error) {
      console.log(error.response.data)
      setNotification({
        type: 'error',
        message: `${error.response.data.error}`
      })
    }
  }

  blogs.sort((a, b) => {
    return a.likes - b.likes
  })

  return (
    <div>
      <Notification notification={notification}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} deleteBlog={removeBlog} user={user}/>
      )}
    </div>
  )
}

export default App