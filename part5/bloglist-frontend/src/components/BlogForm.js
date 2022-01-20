import React, {useState} from 'react'
import PropTypes from 'prop-types'

const BlogForm = ({createBlog}) => {
    const [newBlog, setNewBlog] = useState({
        title: '',
        author: '',
        url: '',
        likes: 0
    })
    
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

    const addBlog = () => {
        createBlog()
    }

    return (
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
}

BlogForm.propTypes = {
    createBlog = PropTypes.func.isRequired
}

export default BlogForm