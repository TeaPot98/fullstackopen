/* eslint-disable no-debugger */
/* eslint-disable linebreak-style */
import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  BrowserRouter as Router, 
  Routes, Route, Link, useNavigate
} from 'react-router-dom'

import Blog from "./components/Blog";
import BlogDetails from "./components/BlogDetails";
import Notification from "./components/Notification";
import NavigationBar from "./components/NavigationBar";
import BlogForm from "./components/BlogForm";
import LoginForm from "./components/LoginForm";
import Users from './components/Users'
import User from './components/User'

import blogService from "./services/blogs";

import { changeNotification } from './reducers/notificationReducer'
import { initBlogs, createBlog } from "./reducers/blogReducer";
import { getAllUsers, saveUser } from "./reducers/userReducer";


const App = () => {
  // const [blogs, setBlogs] = useState([]);
  
  const [user, setUser] = useState(null);
  // const [notification, setNotification] = useState(null);

  const dispatch = useDispatch()

  const blogs = useSelector(state => state.blogs)
  
  const padding = {
    padding: 5
  }

  useEffect(() => {
    console.log("The blogs are fetched from server in useEffect");
    // blogService.getAll().then((blogs) => setBlogs(blogs));
    dispatch(initBlogs())
    dispatch(getAllUsers())
  }, []);

  useEffect(() => {
    if (!user) {
      const loggedUserJSON = window.localStorage.getItem("bloglist-user");
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON);
        setUser(user);
        dispatch(saveUser(user))
        console.log(user);
        blogService.setToken(user.token);
      }
    }
  }, []);

  const handleLogout = () => {
    window.localStorage.removeItem("bloglist-user");
    setUser(null);
  };

  blogs.sort((a, b) => {
    return a.likes - b.likes;
  });

  return (
    <div>
      <NavigationBar user={user} handleLogout={handleLogout} />
      <Notification/>
      <Routes>
        <Route path='users' element={<Users />} />
        <Route 
          path='/' 
          element={
            <div>
              {<BlogForm />}
              {blogs.map((blog) => (
              <Blog
                key={blog.id}
                blogId={blog.id}
                user={user}
              />
              ))}
            </div>
          }/>
        <Route
          path='/users/:id'
          element={<User />}
        />
        <Route 
          path='/blogs/:id'
          element={<BlogDetails />}
        />
        <Route 
          path='/login'
          element={<LoginForm />}
        />
      </Routes>
    </div>
  );
};

export default App;
