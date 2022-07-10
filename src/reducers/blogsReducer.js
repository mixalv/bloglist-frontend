import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'

const initialState = []

const blogsSlice = createSlice(
  {
    name: 'blogs',
    initialState,
    reducers: {
      setBlogs(state, action) {
        return action.payload
      },
      addBlog(state, action) {
        return state.concat(action.payload)
      },
      changeBlog(state, action) {
        return state.map(blog => blog.id === action.payload.id ? action.payload : blog)
      },
      removeBlog(state, action) {
        return state.filter(e => e.id !== action.payload)
      }
    }
  }
)

export const blogsInitializer = () => {
  return async dispatch => {
    const response = await blogService.getAll()
    dispatch(setBlogs(response))
  }
}

export const { setBlogs, addBlog, changeBlog, removeBlog } = blogsSlice.actions
export default blogsSlice.reducer
