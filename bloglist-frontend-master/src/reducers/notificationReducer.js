const notificationReducer = (store = { message: '' }, action) => {
    switch (action.type) {
        case 'SET_MESSAGE':
            return {
                message: action.message,
                success: action.success
            }
        case 'ERASE_MESSAGE':
            return { message: '' }
        default:
            return store
    }
}

export const notificationSet = (message, success) => {
    return async (dispatch) => {
        dispatch({
            type: 'SET_MESSAGE',
            message: message,
            success: success
        })
        setTimeout(() => {
            dispatch({
                type: 'ERASE_MESSAGE',
            })
        }, 5000)
    }
}

export default notificationReducer