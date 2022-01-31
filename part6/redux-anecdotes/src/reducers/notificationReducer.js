const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
}

let notificationTimeout

export const setNotification = (message, time) => {
    return async dispatch => {
        if (notificationTimeout) {
            clearTimeout(notificationTimeout)
        }
        notificationTimeout = setTimeout(() => {
            dispatch({
                type: 'REMOVE_NOTIFICATION'
            })
        }, time * 1000)
        dispatch({
            type: 'SET_NOTIFICATION',
            message: message 
        })
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer