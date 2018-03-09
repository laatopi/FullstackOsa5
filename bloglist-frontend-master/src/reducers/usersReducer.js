import usersService from '../services/users'

const usersReducer = (store = [], action) => {
    switch (action.type) {
        case 'INITIATE_USERS':
            return action.users
        default:
            return store
    }
}
export const usersInitialization = () => {
    return async (dispatch) => {
        const users = await usersService.getUsers()
        dispatch({
            type: 'INITIATE_USERS',
            users: users
        })
    }
}

export default usersReducer