import { useSelector } from 'react-redux'
import '../index.css'

const Notification = () => {
  const message = useSelector(({ notification }) => notification )
  if (message === null) {
    return null
  }
  return(
    <div className={message.state}>{message.text}</div>
  )
}

export default Notification