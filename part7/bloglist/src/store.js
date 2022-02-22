import { createStore } from 'redux'
import notificationReducer from './reducers/notificationReducer'

const store = createStore(notificationReducer)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log('The notification from store >> ', storeNow)
})

export default store