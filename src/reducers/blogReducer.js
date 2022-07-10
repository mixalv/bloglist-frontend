import { createSlice } from '@reduxjs/toolkit'
import blogService from '../services/blogs'


const initialState = null
const blogSlice = createSlice({
  name: 'blog',
  initialState,
  reducers: {
    setBlog(state, action) {
      return action.payload
    },
    concatComment(state, action) {
      console.log('im in concat comment', action.payload)
      const comments = state.comments.concat(action.payload)
      return { ...state, comments }
    }
  }
})



export const blogInitializer = (id) => {
  return async dispatch => {
    const response = await blogService.getBlog(id)
    dispatch(setBlog(response))
  }
}

export const { setBlog, concatComment } = blogSlice.actions

export default blogSlice.reducer