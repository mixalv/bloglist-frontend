import { useState, useEffect } from 'react'
import loginService from '../services/login'
import { notificate } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../reducers/userReducer'
import { Form, Button } from 'react-bootstrap'

const Login = () => {

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const user = useSelector(({ currentUser }) => currentUser)

  const dispatch = useDispatch()

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedUser')
    if(userJson) {
      dispatch(setUser(JSON.parse(userJson)))
    }

  }, [])

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      dispatch(setUser(user))
      setUsername('')
      setPassword('')
      dispatch(notificate('you successfully logged in', 'success'))
    }
    catch(error) {
      console.log(error.response.data.error)
      dispatch(notificate(error.response.data.error, 'error'))
    }
  }

  if (!user) return(
    <div className="container">
      <h1>Login to application</h1>
      <Form onSubmit={handleLogin}>
        <Form.Group>
          <Form.Label>username</Form.Label>
          <Form.Control
            type="text"
            value={username}
            onChange={({ target }) => setUsername(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>password</Form.Label>
          <Form.Control
            type="text"
            value={password}
            onChange={({ target }) => setPassword(target.value)}
          />
        </Form.Group>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
  return null
}

export default Login