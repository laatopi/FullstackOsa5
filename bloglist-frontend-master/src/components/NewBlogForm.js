import React from 'react'
import blogService from '../services/blogs'
import Notification from './Notification'
import PropTypes from 'prop-types'



class NewBlogForm extends React.Component {
  static propTypes = {
    blogConcat: PropTypes.func.isRequired
  }
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

  addBlog = (event) => {
    event.preventDefault()
    const blogObject = {
      title: this.state.title,
      author: this.state.author,
      url: this.state.url
    }

    blogService
      .create(blogObject)
      .then(newBlog => {
        this.props.blogConcat(newBlog)
        this.setState({
          title: '',
          author: '',
          url: '',
          message: `A new blog '${blogObject.title}' by ${blogObject.author} added`
        })
        setTimeout(() => {
          this.setState({ message: null, })
        }, 5000)
      })
  }

  render() {
    return (
      <div>
        <Notification message={this.state.message} />
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

export default NewBlogForm;