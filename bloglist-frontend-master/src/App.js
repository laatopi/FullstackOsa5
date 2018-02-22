import React from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'

class App extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      blogs: [],
      showAll: true,
      error: null,
      username: '',
      password: '',
      user: null
    }
  }

  componentDidMount() {
    blogService.getAll().then(blogs =>
      this.setState({ blogs })
    )
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.setState({ user })
        blogService.setToken(user.token)
      }
    } catch (exception) {
      console.log('no user logged in')
    }
  }

  handleLoginFieldChange = (event) => {
    this.setState({ [event.target.name]: event.target.value })
  }

  login = async (event) => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username: this.state.username,
        password: this.state.password
      })

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      console.log('TÄSSÄ ON USER', window.localStorage.getItem('loggedBlogappUser', JSON.stringify(user)))

      blogService.setToken(user.token)
      this.setState({ username: '', password: '', user })
    } catch (exception) {
      this.setState({
        error: 'käyttäjätunnus tai salasana virheellinen'
      })
      setTimeout(() => {
        this.setState({ error: null })
      }, 5000)
    }
  }

  setBlogs = (blog) => {
    const id = blog._id
    const blogToChange = this.state.blogs.find(b => b._id === id)
    const changedBlog = { ...blogToChange, likes: blogToChange.likes + 1 }
    const newList = this.state.blogs.map(blog => blog._id !== id ? blog : changedBlog)
    this.setState({
      blogs: newList
    })
  }

  logout = async (event) => {

    await console.log(this.state.user)
    window.localStorage.removeItem('loggedBlogappUser')
    this.setState({
      user: null
    })
  }

  concateBlogs = (blog) => {
    this.setState({
      blogs: this.state.blogs.concat(blog)
    })
  }

  filterBlogs = (id) => {
    this.setState({
      blogs: this.state.blogs.filter(blog => blog._id !== id)
    })
  }

  compareByLikes = (a, b) => {
    if (a.likes > b.likes)
      return -1
    if (a.likes < b.likes)
      return 1
    return 0
  }

  render() {
    const loginForm = () => (
      <Togglable buttonLabel="Show Login" >
        <LoginForm
          handleSubmit={this.login}
          handleChange={this.handleLoginFieldChange}
          username={this.state.username}
          password={this.state.password}
        />
      </Togglable>
    )

    const blogs = () => (
      <div>
        <h2>blogs</h2>
        {this.state.blogs.sort(this.compareByLikes).map(blog =>
          <Blog setBlogs={this.setBlogs} key={blog._id} blog={blog} user={blog.user} loggedUser={this.state.user}
            filterBlogs={this.filterBlogs} />
        )}
        )

      </div>
    )

    return (
      <div className="wrapper">

        <h1>BLOGEJA!!!</h1>

        <Notification message={this.state.error} />

        {this.state.user === null ?
          loginForm() :
          <div>
            <p>{this.state.user.name} logged in</p>
            <button onClick={this.logout}>logout</button>
            <NewBlogForm blogConcat={this.concateBlogs} />
            {blogs()}
          </div>
        }



      </div>
    );
  }
}

export default App;
