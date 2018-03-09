import React from 'react'
import { connect } from 'react-redux'
import { userErase } from '../reducers/userReducer'

class LogoutButton extends React.Component {
    logout = async (event) => {
        window.localStorage.removeItem('loggedBlogappUser')
        this.props.userErase()
    }

    render() {
        return (
            <div>
                <button onClick={this.logout}>logout</button>

            </div>
        )
    }

}
export default connect(
    null,
    { userErase }
)(LogoutButton)