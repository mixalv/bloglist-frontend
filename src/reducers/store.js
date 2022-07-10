import { configureStore } from '@reduxjs/toolkit'
import notificationReducer from './notificationReducer'
import blogsReducer from './blogsReducer'
import userReducer from './userReducer'
import usersReducer from './usersReducer'
import blogReducer from './blogReducer'

const store = configureStore(
  { reducer: {
    notification: notificationReducer,
    blogs: blogsReducer,
    currentUser: userReducer,
    users: usersReducer,
    blog: blogReducer
  } })

export default store