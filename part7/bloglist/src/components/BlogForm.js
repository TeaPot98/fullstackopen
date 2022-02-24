/* eslint-disable linebreak-style */
import React, { useState, useRef } from "react";
import PropTypes from "prop-types";
import Togglable from "./Togglable";
import { useDispatch } from "react-redux";
import { changeNotification } from "../reducers/notificationReducer";
import { createBlog } from "../reducers/blogReducer";

const BlogForm = () => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

  const dispatch = useDispatch()

  const setNotification = notification => {
    dispatch(changeNotification(notification, 3))
  }

  const handleTitleChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setNewBlog({
      ...newBlog,
      title: event.target.value,
    });
  };

  const handleAuthorChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setNewBlog({
      ...newBlog,
      author: event.target.value,
    });
  };

  const handleUrlChange = (event) => {
    event.preventDefault();
    console.log(event.target.value);
    setNewBlog({
      ...newBlog,
      url: event.target.value,
    });
  };

  const addBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility();

    try {
      dispatch(createBlog(newBlog))

      console.log('The log from addBlog function >> ')

      setNotification({
        type: "success",
        message: `Successfully added blog "${newBlog.title}"`,
      });
      // console.log('Returned blog from "addBlog" function >>> ', returnedBlog);
    } catch (error) {
      console.log('The error from addBlog >>> ', error)
      console.log(error);
      setNotification({
        type: "error",
        message: `${error}`,
      });
    }

    setNewBlog({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  };  
  
  const blogFormRef = useRef();

  return (
    <Togglable buttonLabel="new blog" ref={blogFormRef}>
      <form onSubmit={addBlog}>
        <h2>create new</h2>
        title:
        <input
          type="text"
          id="title-input"
          value={newBlog.title}
          name="Title"
          onChange={handleTitleChange}
        />
        <br />
        author:
        <input
          type="text"
          id="author-input"
          value={newBlog.author}
          name="Author"
          onChange={handleAuthorChange}
        />
        <br />
        url:
        <input
          type="text"
          id="url-input"
          value={newBlog.url}
          name="Url"
          onChange={handleUrlChange}
        />
        <button type="submit">save</button>
      </form>
    </Togglable>
  );
};

export default BlogForm;
