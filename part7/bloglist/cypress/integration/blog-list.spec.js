/* eslint-disable indent */
describe('Blog app', function() {
    beforeEach(function() {
        cy.request('POST', 'http://localhost:3003/api/testing/reset')
        const user = {
            name: 'John Doe',
            username: 'root',
            password: 'test111'
        }
        cy.request('POST', 'http://localhost:3003/api/users', user)
        cy.visit('http://localhost:3000')
    })

    it('Login form is shown', function() {
        cy.contains('log in').click()
        cy.contains('username').should('be.visible')
        cy.contains('password').should('be.visible')
    })

    describe('Login', function() {
        it('succeeds with correct credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('test111')
            cy.get('#login-button').click()

            cy.contains('John Doe logged in')
        })

        it('fails with wrong credentials', function() {
            cy.contains('log in').click()
            cy.get('#username').type('root')
            cy.get('#password').type('wrong')
            cy.get('#login-button').click()

            cy.get('#notification')
                .should('contain', 'invalid username or password')
                .and('have.css', 'color', 'rgb(255, 0, 0)')

            cy.get('html').should('not.contain', 'John Doe logged in')
        })
    })

    describe('When logged in', function() {
        beforeEach(function() {
            cy.login({ username: 'root', password: 'test111' })
        })

        it('A blog can be created', function() {
            cy.contains('new blog').click()
            cy.get('#title-input').type('a blog created by cypress')
            cy.get('#author-input').type('Cypress Author')
            cy.get('#url-input').type('Cypress url')
            cy.contains('save').click()
            cy.contains('a blog created by cypress')
            cy.contains('Cypress Author')
            cy.contains('Cypress url')
        })
    })
})