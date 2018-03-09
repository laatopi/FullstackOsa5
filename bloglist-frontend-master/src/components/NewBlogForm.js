import React from 'react'
import { notificationSet } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { blogCreation } from '../reducers/blogReducer'

class NewBlogForm extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      title: '',
      author: '',
      url: '',
      message: null
    }
  }

  handleChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  addBlog = async (event) => {
    event.preventDefault()

    try {
      const blogObject = {
        title: this.state.title,
        author: this.state.author,
        url: this.state.url
      }
      this.setState({
        title: '',
        author: '',
        url: '',
      })
      this.props.blogCreation(blogObject)
      this.props.notificationSet(`A new blog '${blogObject.title}' by ${blogObject.author} added`, true)
    } catch (e) {
      this.props.notificationSet(`Invalid blog, try filling all fields!`, false)
    }
  }

  render() {
    return (
      <div>
        <h2> Create new blog </h2>
        <form onSubmit={this.addBlog}>
          <div>
            title:
            <input
              value={this.state.title}
              onChange={this.handleChange}
              name="title"
              type="text"
            />
          </div>
          <div>
            author:
            <input
              value={this.state.author}
              onChange={this.handleChange}
              name="author"
              type="text"
            />
          </div>
          <div>
            url:
            <input
              value={this.state.url}
              onChange={this.handleChange}
              name="url"
              type="text"
            />
          </div>
          <button type="submit">create</button>
        </form>
      </div>
    )
  }
}

export default connect(
  null,
  { notificationSet, blogCreation }
)(NewBlogForm)