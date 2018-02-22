import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './SimpleBlog'

describe.only('<SimpleBlog />', () => {
  const blog = {
    title: 'Paavon Seikkailut',
    author: 'Spongebob Väyrynen',
    likes: 55
  }

   it('renders blogs content', () => {
 
 
     const simpleBlogComponent = shallow(<SimpleBlog blog={blog} />)
     const contentDiv = simpleBlogComponent.find('.wrapper')
 
     expect(contentDiv.text()).toContain(blog.title)
     expect(contentDiv.text()).toContain(blog.likes)
   }),

  it('clicking like button twice calls eventhandler twice', () => {
    const mockHandler = jest.fn()

    const simpleBlogComponent = shallow(
      <SimpleBlog
        blog={blog}
        onClick={mockHandler}
      />
    )
    const button = simpleBlogComponent.find('button')
    button.simulate('click')
    button.simulate('click')

    expect(mockHandler.mock.calls.length).toBe(2)
  })
})