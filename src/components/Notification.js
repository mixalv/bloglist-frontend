import '../index.css'

const Notification = ({ message }) => {
  if (message === null) {
    return null
  }
  return(
    <div className={message.state}>{message.text}</div>
  )
}

export default Notification