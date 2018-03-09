import React from 'react'
import { connect } from 'react-redux'
import { usersInitialization } from '../reducers/usersReducer'
import { BrowserRouter as Link } from 'react-router-dom'

class Users extends React.Component {

    componentDidMount() {
        this.props.usersInitialization()
    }

    render() {
        return (
            <div>
                <table>
                    <tbody>
                        <tr>
                            <th>Nimi</th>
                            <th>Blogeja</th>
                        </tr>
                        {this.props.users.map(user =>
                            <tr>
                                <td><Link key={user.id} to={`/users/${user.id}`}>{user.name}</Link></td>
                                <td>{user.blogs.length}</td>
                            </tr>
                        )}
                    </tbody>
                </table>
            </div>
        )
    }
}

const mapStateToProps = (state) => {
    return {
        users: state.users
    }
}

export default connect(
    mapStateToProps,
    { usersInitialization }
)(Users)
