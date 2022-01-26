/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render } from '@testing-library/react'
import Blog from './Blog'
import blogService from '../services/blogs'

test('the title and author is rendered, the url and number of likes is not rendered', () => {
    const blog = {
        title: 'A dive to the bottom of the world',
        author: 'James Cameron',
        url: 'https://jamescameron.com/a-dive-to-the-bottom-of-the-world',
        likes: 1511,
    }

    let user

    const loggedUserJSON = window.localStorage.getItem('bloglist-user')
    if (loggedUserJSON) {
        user = JSON.parse(loggedUserJSON)
        blogService.setToken(user.token)
    }

    const component = render(
        <Blog blog={blog} user={user}/>
    )
    expect(component.container).toHaveTextContent(
        'A dive to the bottom of the world'
    )
    expect(component.container).toHaveTextContent(
        'James Cameron'
    )

    expect(component.container).not.toHaveTextContent(
        'https://jamescameron.com/a-dive-to-the-bottom-of-the-world'
    )
    expect(component.container).not.toHaveTextContent(
        '1511'
    )
})