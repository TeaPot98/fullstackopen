import userService from '../services/users'

const initialState = {
    all: [],
    current: null
}

const userReducer = (state = initialState, action) => {
    switch (action.type) {
        case 'SET_USER':
            return {...state, current: action.data}
        case 'GET_ALL_USERS':
            return {...state, all: action.data}
        default:
            return state
    }
}

export const saveUser = user => {
    return {
        type: 'SET_USER',
        data: user
    }
}

export const getAllUsers = () => {
    return async dispatch => {
        const users = await userService.getAll()
        dispatch({
            type: 'GET_ALL_USERS',
            data: users
        })
    }
}

export default userReducer