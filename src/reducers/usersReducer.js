import { createSlice } from '@reduxjs/toolkit'
import usersService from '../services/users'

const initialState = []

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers(state, action) {
      return action.payload
    }
  }
})

export const usersInitializer = () => {
  return async dispatch => {
    const response = await usersService.getAll()
    dispatch(setUsers(response))
  }
}

export default usersSlice.reducer
export const { setUsers } = usersSlice.actions