import React from 'react'
import { shallow } from 'enzyme'
import Blog from './Blog'

describe('<Blog />', () => {
    let blogComponent
    let blog

    beforeEach(() => {


        blog = {
            _id: 123,
            title: 'Penaali Päivät',
            author: 'Joakim Jaulimo älä kopioi koodiani',
            url: 'www.poliisi.fi',
            likes: 55,
            user: {
                id: 123,
                name: 'Henri',
                _id: 123
            }
        }

        const mockHandler = jest.fn()

        blogComponent = shallow(
            <Blog key={blog._id} blog={blog} user={blog.user} loggedUser={blog.user}
                filterBlogs={mockHandler} />
        )
    })

    it('renders', () => {
        expect(blogComponent.text()).toContain(blog.title)
    })


    it('at the start details dont show', () => {
        let div = blogComponent.find('.details')
        expect(div.getElement().props.style).toEqual({ display: 'none' })
    })

    it('after clicking name, details are showed', () => {
        const name = blogComponent.find('.name')

        name.at(0).simulate('click')
        const div = blogComponent.find('.details')
        expect(div.getElement().props.style).toEqual({ display: '' })
    })

})