import React from 'react'
import { mount } from 'enzyme'
import App from './App'
import Blog from './components/Blog'
jest.mock('./services/blogs')
import BlogService from './services/blogs'

describe('<App />', () => {
    let app

    describe('when user is not logged', () => {
        beforeEach(() => {
            app = mount(<App />)
            console.log(app.debug())
        })

        it('only login form is rendered', () => {
            app.update()

            const blogComponents = app.find(Blog)
            expect(blogComponents).not.toContain(Blog)
            expect(blogComponents.length).toEqual(0)
        })
    })

    describe('when user is logged', () => {
        beforeEach(() => {
            const user = {
                username: 'tester',
                token: '12121212',
                name: 'Rainer Lindeman'
            }
            localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
            app = mount(<App />)
        })

        it('all blogs are rendered', () => {
            console.log(app.debug())
            app.update()
            const blogComponents = app.find(Blog)
            expect(blogComponents.length).toEqual(BlogService.blogs.length)
        })
    })
})