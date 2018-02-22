import React from 'react'
import blogService from '../services/blogs'

class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extraVisible: false,
      user: this.props.user,
      blog: this.props.blog
    }
  }

  click = (event) => {
    this.setState({ extraVisible: !this.state.extraVisible })
  }

  like = async (event) => {

    const blogObject = {
      _id: this.state.blog._id,
      title: this.state.blog.title,
      author: this.state.blog.author,
      url: this.state.blog.url,
      likes: this.state.blog.likes + 1,
      user: this.state.blog.user
    }
    await this.setState({ blog: blogObject })
    blogService
      .update(this.state.blog._id, blogObject)

    this.props.setBlogs(blogObject)
  }

  delete = async (event) => {

    event.preventDefault()

    if (window.confirm(`Delete '${this.state.blog.name}' by ${this.state.blog.author}`)) {
      blogService
        .deleteBlog(this.state.blog._id)
        .then(this.props.filterBlogs(this.state.blog._id))
    }
  }

  render() {

    let deleteButton

    if (this.state.user === undefined) {
      deleteButton = <button onClick={this.delete}>delete</button>
    } else if (this.state.user._id === this.props.loggedUser.id) {
      deleteButton = <button onClick={this.delete}>delete</button>
    }


    const blogStyle = {
      paddingTop: 10,
      paddingLeft: 2,
      border: 'solid',
      borderWidth: 1,
      marginBottom: 5
    }

    const name = () => (
      <div>
        {this.state.user === undefined ?
          '' :
          <p>added by {this.state.blog.user.name}</p>
        }
      </div>
    )

    const showWhenVisible = { display: this.state.extraVisible ? '' : 'none' }

    return (
      <div style={blogStyle} className="wrapper">
        <div className="name" onClick={this.click}>{this.props.blog.title} {this.props.blog.author}</div>
        <div style={showWhenVisible} className="details">
          <div>{this.props.blog.url}</div>
          <div>{this.state.blog.likes} likes
          <button onClick={this.like}>like</button></div>
          {name()}
          {deleteButton}
        </div>
      </div>
    )
  }
}

export default Blog