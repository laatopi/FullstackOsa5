const userReducer = (store = null, action) => {
    switch (action.type) {
        case 'SET_USER':
            return { user: action.user }
        case 'ERASE_USER':
            return null
        default:
            return store
    }
}

export const userSet = (user) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_USER',
            user
        })
    }
}

export const userErase = () => {
    return async (dispatch) => {
        dispatch({
            type: 'ERASE_USER',
        })
    }
}

export default userReducer