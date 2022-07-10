import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser(state, action) {
      return action.payload
    },
    clearUser() {
      window.localStorage.removeItem('loggedUser')
      return null
    }
  }

})

export default userSlice.reducer
export const { setUser, clearUser } = userSlice.actions