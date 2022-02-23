/* eslint-disable linebreak-style */
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { likeBlog, deleteBlog } from "../reducers/blogReducer";
// import blogService from '../services/blogs'

const Blog = ({ blogId, user }) => {
  const [showDetails, setShowDetails] = useState(false);
  // const [blogLikes, setBlogLikes] = useState(blog.likes);
  let userBlog;
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: "solid",
    borderWidth: 1,
    marginBottom: 5,
  };
  const dispatch = useDispatch()
  const blog = useSelector(state => state.blogs.find(b => b.id === blogId))

  console.log("The blog structure >>>", blog);

  const showWhenVisible = { display: showDetails ? "" : "none" };

  const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails);
  };

  // const addLike = async () => {
  //   try {
  //     // await blogService.update({
  //     //   ...blog,
  //     //   likes: blogLikes + 1
  //     // })
  //     setBlogLikes(blogLikes + 1)
  //   } catch (error) {
  //     console.log(error)
  //   }
  // }

  const addLike = () => {
    try {
      // await blogService.update({
      //   ...blog,
      //   likes: blogLikes + 1,
      // });
      // setBlogLikes(blogLikes + 1);

      dispatch(likeBlog(blog))

    } catch (error) {
      console.log(error);
    }
  };

  const removeBlog = () => {
    // await deleteBlog(blog);
    dispatch(deleteBlog(blog.id))
  };

  if (user) {
    userBlog = user.id === blog.user.id;
  }

  return (
    <div style={blogStyle} className="blog">
      {blog.title} {blog.author}
      <button onClick={toggleDetailsVisibility}>
        {showDetails ? "hide" : "show"}
      </button>
      <div className="blog-details" style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}
        <button
          className="like-button"
          onClick={() => addLike()}
        >
          like
        </button>
        <br />
        {blog.author}
        <br />
        {userBlog ? <button onClick={removeBlog}>remove</button> : <></>}
      </div>
    </div>
  );
};

export default Blog;
