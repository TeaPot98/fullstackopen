/* eslint-disable linebreak-style */
import React, { useState } from 'react'
import blogService from '../services/blogs'

const Blog = ({ blog, deleteBlog, user }) => {
  const [showDetails, setShowDetails] = useState(false)
  const [blogLikes, setBlogLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: showDetails ? '' : 'none' }

  const toggleDetailsVisibility = () => {
    setShowDetails(!showDetails)
  }

  const addLike = async () => {
    try {
      await blogService.update({
        ...blog,
        likes: blog.likes + 1
      })
      setBlogLikes(blog.likes + 1)
    } catch (error) {
      console.log(error)
    }
  }

  const removeBlog = async () => {
    await deleteBlog(blog)
  }

  const userBlog = user.blogs.find(e => e === blog.id)


  return (
    <div style={blogStyle}>
      {blog.title} {blog.author}
      <button onClick={toggleDetailsVisibility}>{showDetails ? 'hide' : 'show'}</button>
      <div style={showWhenVisible}>
        {blog.url}
        <br/>
        likes {blogLikes}
        <button onClick={addLike}>like</button>
        <br/>
        {blog.author}
        <br/>
        {userBlog ?
          <button onClick={removeBlog}>remove</button> :
          <></>
        }
      </div>
    </div>
  )
}

export default Blog