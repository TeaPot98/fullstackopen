import notificationReducer from './notificationReducer'
import deepFreeze from 'deep-freeze'

describe('notificationReducer', () => {
    test('returns new state with action SET_NOTIFICATION', () => {
        const state = []
        const action = {
            type: 'SET_NOTIFICATION',
            data: {
                type: 'success',
                message: 'Test notification'
            }
        }

        deepFreeze(state)
        const newState = notificationReducer(state, action)

        expect(newState).toHaveLength(1)
        expect(newState).toContainEqual(action.data)
    })
})