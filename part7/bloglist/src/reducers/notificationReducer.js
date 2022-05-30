// This is a file with reducer for setting notifications
// The reducer recieves the state and action as parameters
// Depending on what `action` it recieves, it modifies the 
// state and returns a new, updated state

// `Actions` are objects that MUST contain `type` field
// Actions are defined by coders, the `type` field should 
// tell what exactly is this action going to do

// The reducers must be immutable !

import 'redux-thunk'

let notificationTimeout
const initialState = {
    blogs: [],
    notification: null
}

const notificationReducer = (state = null, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return action.data
        case 'REMOVE_NOTIFICATION':
            return null
        default:
            return state
    }
}

// This function returns an action that is supposed to set
// new notification
// The function which returns an action is called `Action creator`
export const changeNotification = (notification, time) => {
    // Using 'redux-thunk' library
    // This library allows us to return functions from 'action creators'
    // This also allows to return async functions (e.g. fetching some data)
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
            data: notification
        })
    }
//     return {
//         type: 'SET_NOTIFICATION',
//         data: notification 
//     }
}

export default notificationReducer