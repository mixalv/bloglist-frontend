import { useDispatch } from 'react-redux'
import { notificate } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'



const errorHandler = (error) => {
  const dispatch = useDispatch()
  if (error.response.data.error ==='token expired')
  {
    dispatch(notificate('Your session expired', 'error'))
    dispatch(clearUser())
  } else {
    dispatch(notificate(error.response.data.error, 'error'))
  }
}

export default { errorHandler }