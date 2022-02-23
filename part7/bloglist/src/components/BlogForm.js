/* eslint-disable linebreak-style */
import React, { useState } from "react";
import PropTypes from "prop-types";

const BlogForm = ({ createBlog }) => {
  const [newBlog, setNewBlog] = useState({
    title: "",
    author: "",
    url: "",
    likes: 0,
  });

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
    await createBlog(newBlog);
    setNewBlog({
      title: "",
      author: "",
      url: "",
      likes: 0,
    });
  };

  return (
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
  );
};

BlogForm.propTypes = {
  createBlog: PropTypes.func.isRequired,
};

export default BlogForm;
