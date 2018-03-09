import React from 'react'
import { connect } from 'react-redux'
import { blogDelete } from '../reducers/blogReducer'
import { blogLike } from '../reducers/blogReducer'


class Blog extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      extraVisible: false,
      blog: this.props.blog,
      owner: this.props.owner
    }
  }

  click = (event) => {
    this.setState({ extraVisible: !this.state.extraVisible })
  }

  like = async (event) => {
    this.props.blogLike({ ...this.props.blog, likes: this.props.blog.likes + 1 })
  }

  delete = async (event) => {
    event.preventDefault()
    if (window.confirm(`Delete '${this.state.blog.name}' by ${this.state.blog.author}`)) {
      this.props.blogDelete(this.props.blog)

    }
  }

  render() {

    let deleteButton

    if (this.props.owner === undefined) {
      deleteButton = <button onClick={this.delete}>delete</button>
    } else if (this.props.owner._id === this.props.user.id) {
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
        {this.props.owner === undefined ?
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
          <div>{this.props.blog.likes} likes
          <button onClick={this.like}>like</button></div>
          {name()}
          {deleteButton}
        </div>
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user.user
  }
}

export default connect(
  mapStateToProps,
  { blogLike, blogDelete }
)(Blog)
