import React, { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'


const App = () => {
  const [blogs, setBlogs] = useState([])
  const [newBlog, setNewBlog] = useState({
    title: '',
    author: '',
    url: ''
  })
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

  const handleTitleChange = event => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlog({
      ...newBlog,
      title: event.target.value
    })
  }

  const handleAuthorChange = event => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlog({
      ...newBlog,
      author: event.target.value
    })
  }

  const handleUrlChange = event => {
    event.preventDefault()
    console.log(event.target.value)
    setNewBlog({
      ...newBlog,
      url: event.target.value
    })
  }

  const addBlog = async event => {
    event.preventDefault()

    try {
      const returnedBlog = await blogService.create(newBlog)
      console.log('Returned blog from "addBlog" function >>> ', returnedBlog)
      setBlogs(blogs.concat(returnedBlog))
      setNewBlog({
        title: '',
        author: '',
        url: ''
      })
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

  const loginForm = () => (
    <form onSubmit={handleLogin}>
      <div>
        username
        <input
          type="text"
          value={username}
          name="Username"
          onChange={({target}) => setUsername(target.value)}
        />
      </div>
      <div>
        password
        <input
          type="password"
          value={password}
          name="Password"
          onChange={({target}) => setPassword(target.value)}
        />
      </div>
      <button type="submit">login</button>
    </form>
  )

  const blogForm = () => (
    <form onSubmit={addBlog}>
      <h2>create new</h2>
      title:
      <input
        type="text"
        value={newBlog.title}
        name="Title"
        onChange={handleTitleChange}
      />
      <br/>
      author:
      <input
        type="text"
        value={newBlog.author}
        name="Author"
        onChange={handleAuthorChange}
      />
      <br/>
      url:
      <input
        type="text"
        value={newBlog.url}
        name="Url"
        onChange={handleUrlChange}
      />
      <button type="submit">save</button>
    </form>
  )

  return (
    <div>
      <Notification notification={notification}/>
      {user === null ?
        loginForm() :
        <div>
          <p>{user.name} logged-in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      }

      <h2>blogs</h2>
      {blogs.map(blog =>
        <Blog key={blog.id} blog={blog} />
      )}
    </div>
  )
}

export default App