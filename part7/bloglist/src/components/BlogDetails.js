import React, { useState } from 'react'
import { useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { commentBlog, deleteBlog, likeBlog } from '../reducers/blogReducer'

const BlogDetails = () => {
    const [comment, setComment] = useState('')
    const dispatch = useDispatch()
    const id = useParams().id
    const blog = useSelector(state => state.blogs.find(b => b.id === id))
    const user = useSelector(state => state.users.current)
    let userBlog

    const addLike = () => {
        try {

            dispatch(likeBlog(blog))

        } catch (error) {
            console.log(error);
        }
    };

    const removeBlog = () => {
        // await deleteBlog(blog);
        dispatch(deleteBlog(blog.id))
    };
    
    const addComment = event => {
        event.preventDefault()
        dispatch(commentBlog(blog.id, comment))
        setComment('')
    }

    if (!blog || !user) {
        return null
    }

    if (blog && user && user !== null && user !== undefined) {
        if (blog.user.id) {
            userBlog = user.id === blog.user.id
        } else {
            userBlog = user.id === blog.user
        }
    }
    
    return (
        <div>
            <h2>{blog.title}</h2>
            <a href={`${blog.url}`}>{blog.url}</a>
            <div>
                {blog.likes} likes 
                <button
                    className="like-button"
                    onClick={() => addLike()}
                >
                    like
                </button>
            </div>
            added by {blog.author}
            <div>
                {userBlog ? <button onClick={removeBlog}>remove</button> : <></>}
            </div>
            <h4>comments</h4>
            <form onSubmit={addComment}>
                <input type='text' value={comment} onChange={event => setComment(event.target.value)}/>
                <button type='submit'>add comment</button>
            </form>
            <ul>
                {blog.comments.map(c => 
                    <li key={c.id}>{c.content}</li>
                )}
            </ul>
        </div>
    )
}

export default BlogDetails