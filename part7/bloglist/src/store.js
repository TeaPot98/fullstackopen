import { applyMiddleware, createStore, combineReducers } from 'redux'
import thunk from 'redux-thunk'
import blogReducer from './reducers/blogReducer'
import notificationReducer from './reducers/notificationReducer'
import userReducer from './reducers/userReducer'


const reducer = combineReducers({
    blogs: blogReducer,
    notification: notificationReducer,
    users: userReducer
})

const store = createStore(
    reducer,
    applyMiddleware(thunk)
)

store.subscribe(() => {
    const storeNow = store.getState()
    console.log('The notification from store >> ', storeNow)
})

export default store