/* eslint-disable indent */
/* eslint-disable linebreak-style */
import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
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

    const blogDetails = component.container.querySelector('.blog-details')

    expect(blogDetails).toHaveStyle(
        'display: none'
    )
})

test('the blog\'s url and number of likes are shown when the button is clicked', () => {
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

    const button = component.getByText('show')
    fireEvent.click(button)

    const div = component.container.querySelector('.blog-details')
    expect(div).not.toHaveStyle('display: none')
})

test('if the like button is clicked twice, the event handler is called twice', async () => {
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

    const mockHandler = jest.fn()

    const component = render(
        <Blog blog={blog} user={user} addLike={mockHandler}/>
    )

    const button = component.container.querySelector('.like-button')
    console.log('THE LIKE BUTTON >>> ', button)
    await fireEvent.click(button)
    await fireEvent.click(button)

    expect(mockHandler.mock.calls).toHaveLength(2)
})
