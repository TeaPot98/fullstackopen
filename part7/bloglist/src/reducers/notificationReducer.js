// This is a file with reducer for setting notifications
// The reducer recieves the state and action as parameters
// Depending on what `action` it recieves, it modifies the 
// state and returns a new, updated state

// `Actions` are objects that MUST contain `type` field
// Actions are defined by coders, the `type` field should 
// tell what exactly is this action going to do

const initialState = {
    notification: null
}

const notificationReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_NOTIFICATION':
            return {...state, notification: action.data}
        default:
            return state
    }
}

// This function returns an action that is supposed to set
// new notification
// The function which returns an action is called `Action creator`
export const setNotification = notification => {
    return {
        type: 'SET_NOTIFICATION',
        data: notification
    }
}

export default notificationReducer