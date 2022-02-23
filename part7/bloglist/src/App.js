/* eslint-disable no-debugger */
/* eslint-disable linebreak-style */
import React, { useState, useEffect, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import Blog from "./components/Blog";
import Notification from "./components/Notification";
import Togglable from "./components/Togglable";
import BlogForm from "./components/BlogForm";
import blogService from "./services/blogs";
import loginService from "./services/login";
import store from './store'
import { changeNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog, likeBlog, deleteBlog } from "./reducers/blogReducer";

const App = () => {
  // const [blogs, setBlogs] = useState([]);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState(null);

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)

  useEffect(() => {
    console.log("The blogs are fetched from server in useEffect");
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(initBlogs())
  }, []);

  useEffect(() => {
    if (!user) {
      const loggedUserJSON = window.localStorage.getItem("bloglist-user");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        console.log(user);
        blogService.setToken(user.token);
      }
    }
  }, []);

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
      setUser(user);
      setUsername("");
      setPassword("");
      setNotification({
        type: "success",
        message: `Successfully logged in as ${user.name}`,
      });
    } catch (error) {
      // Implement the error message ??
      setNotification({
        type: "error",
        message: `Login failed: ${error.response.data.error}`,
      });
      console.error(error.response.data.error);
    }

    console.log(
      "Logging with: Username >>> ",
      username,
      " Password >>> ",
      password
    );
  };

  const handleLogout = () => {
    window.localStorage.removeItem("bloglist-user");
    setUser(null);
  };

  const setNotification = notification => {
    dispatch(changeNotification(notification, 3))
  }

  const blogFormRef = useRef();

  const blogForm = () => (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <BlogForm createBlog={addBlog} />
    </Togglable>
  );

  const addBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility();

    try {
      // const returnedBlog = await blogService.create(blogObject);

      // setBlogs(blogs.concat(returnedBlog));

      dispatch(createBlog(blogObject))

      console.log('The log from addBlog function >> ')

      setNotification({
        type: "success",
        message: `Successfully added blog "${returnedBlog.title}"`,
      });
      console.log('Returned blog from "addBlog" function >>> ', returnedBlog);
    } catch (error) {
      console.log('The error from addBlog >>> ', error)
      console.log(error);
      setNotification({
        type: "error",
        message: `${error}`,
      });
    }
  };

  const loginForm = () => (
    <Togglable buttonLabel="log in">
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
    </Togglable>
  );

  blogs.sort((a, b) => {
    return a.likes - b.likes;
  });

  return (
    <div>
      <Notification/>
      {user === null ? (
        loginForm()
      ) : (
        <div>
          <p>{user.name} logged in</p>
          <button onClick={handleLogout}>logout</button>
          {blogForm()}
        </div>
      )}

      <h2>blogs</h2>
      {blogs.map((blog) => (
        <Blog
          key={blog.id}
          blogId={blog.id}
          user={user}
        />
      ))}
    </div>
  );
};

export default App;
