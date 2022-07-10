import { createSlice } from '@reduxjs/toolkit'

const initialState = null

const notificationSlice = createSlice(
  {
    name: 'notification',
    initialState,
    reducers: {
      setMessage(state, action) {
        return {
          text: action.payload.text,
          state: action.payload.state
        }
      },
      removeMessage() {
        return null
      }
    }
  }
)


export const notificate = (text, state) => {
  return dispatch => {
    dispatch(setMessage( { text, state } ))
    setTimeout(() => {
      dispatch(removeMessage())
    }, 5000)
  }}
export default notificationSlice.reducer
export const { setMessage, removeMessage } = notificationSlice.actions