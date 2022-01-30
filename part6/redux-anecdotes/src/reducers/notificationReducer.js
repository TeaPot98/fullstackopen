const notificationReducer = (state = '', action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.message
        case 'REMOVE_NOTIFICATION':
            return ''
        default:
            return state
    }
    return state
}

export const setNotification = message => {
    return {
        type: 'SET_NOTIFICATION',
        message: message 
    }
}

export const removeNotification = () => {
    return {
        type: 'REMOVE_NOTIFICATION'
    }
}

export default notificationReducer