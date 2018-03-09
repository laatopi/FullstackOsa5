import React from 'react'
import { connect } from 'react-redux'
import Blog from './Blog'
import { blogInitialization } from '../reducers/blogReducer'


class BlogList extends React.Component {
  componentDidMount() {
    this.props.blogInitialization()
  }

  compareByLikes = (a, b) => {
    if (a.likes > b.likes)
      return -1
    if (a.likes < b.likes)
      return 1
    return 0
  }

  render() {


    return (
      <div>
        <h2>blogs</h2>
        {this.props.blogs.sort(this.compareByLikes).map(blog =>
          <Blog key={blog._id} blog={blog} owner={blog.user} loggedUser={this.props.user} />
        )}
      </div>
    )
  }
}


const mapStateToProps = (state) => {
  return {
    blogs: state.blogs
  }
}

export default connect(
  mapStateToProps,
  { blogInitialization }
)(BlogList)
