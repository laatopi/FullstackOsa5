import React from 'react'
import Notification from './components/Notification'
import blogService from './services/blogs'
import NewBlogForm from './components/NewBlogForm'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import LogoutButton from './components/LogoutButton'
import BlogList from './components/BlogList'
import { connect } from 'react-redux'
import { userSet } from './reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'

class App extends React.Component {

  componentDidMount() {
    try {
      const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
      if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        this.props.userSet(user)
        blogService.setToken(user.token)
      }
    } catch (exception) {
      console.log('no user logged in')
    }
  }

  render() {

    const loginForm = () => (
      <Togglable buttonLabel="Show Login" >
        <LoginForm />
      </Togglable>
    )

    const createForm = () => (
      <Togglable buttonLabel="Show Blog Form">
        <NewBlogForm />
      </Togglable>
    )

    return (
      <div className="wrapper">
        <Router>
          <div>
            <h1>BLOGEJA!!!</h1>
            <Notification />
            {this.props.user === null ?
              loginForm() :
              <div>
                <Link to='/'>blogs</Link>&nbsp;
                <Link to='/users'>users</Link>&nbsp;
                <p>{this.props.user.user.name} logged in</p>
                <LogoutButton />
                <Route exact path='/' render={() =>
                  <div>
                    {createForm()}
                    <BlogList />
                  </div>} />
                <Route path='/users' render={() => <Users />} />
                <Route exact path="/users/:id" render={({ match }) =>
                  <User id={match.params.id} />}
                />
              </div>
            }
          </div>
        </Router>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    user: state.user
  }
}

export default connect(
  mapStateToProps,
  { userSet }
)(App)

