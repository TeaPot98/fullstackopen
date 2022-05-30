import blogService from '../services/blogs'

const blogReducer = (state = [], action) => {
    switch (action.type) {
        case 'INIT_BLOGS':
            return action.data
        case 'NEW_BLOG':
            return [...state, action.data]
        case 'DELETE_BLOG':
            return state.filter(b => b.id !== action.data.id)
        case 'LIKE_BLOG':
            return state.map(b => b.id !== action.data.id ? b : action.data)
        case 'COMMENT_BLOG':
            return state.map(b => b.id !== action.data.blog ? b : {...b, comments: b.comments.concat(action.data)})
        default:
            return state
    }
}

export const createBlog = data => {
    return async dispatch => {
        const newBlog = await blogService.create(data)
        dispatch({
            type: 'NEW_BLOG',
            data: newBlog
        })
    }
}

export const initBlogs = () => {
    return async dispatch => {
        const blogs = await blogService.getAll()
        dispatch({
            type: 'INIT_BLOGS',
            data: blogs
        })
    }
}

export const deleteBlog = id => {
    return async dispatch => {
        const response = await blogService.remove(id)
        dispatch({
            type: 'DELETE_BLOG',
            data: {
                id: id
            }
        }) 
    }
}

export const likeBlog = blogObject => {
    return async dispatch => {
        const updatedBlog = await blogService.update({
            ...blogObject,
            likes: blogObject.likes + 1
        })
        dispatch({
            type: 'LIKE_BLOG',
            data: updatedBlog
        })
    }
}

export const commentBlog = (blogId, comment) => {
    return async dispatch => {
        const response = await blogService.commentBlog(blogId, comment)
        dispatch({
            type: 'COMMENT_BLOG',
            data: response
        })
    }
}

export default blogReducer