import React from 'react'
import blogService from '../services/blogs'
import loginService from '../services/login'
import { notificationSet } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import { userSet } from '../reducers/userReducer'

class LoginForm extends React.Component {

  login = async (event) => {
    event.preventDefault()

    try {
      let user = await loginService.login({
        username: event.target.username.value,
        password: event.target.password.value
      })
      user = user.data

      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      blogService.setToken(user.token)
      this.props.userSet(user)
      this.props.notificationSet(`Logged in succesfully!`, true)

    } catch (exception) {
      this.props.notificationSet(`Credentials wrong!`, false)
    }
  }

  render() {
    return (
      <div>
        <h2>Kirjaudu</h2>
        <form onSubmit={this.login} className="loginform">
          <div>
            käyttäjätunnus
            <input
              type="text"
              name="username"
            />
          </div>
          <div>
            salasana
            <input
              type="password"
              name="password"
            />
          </div>
          <button type="submit">kirjaudu</button>
        </form>
      </div >
    )
  }
}


export default connect(
  null,
  { notificationSet, blogService, loginService, userSet }
)(LoginForm)