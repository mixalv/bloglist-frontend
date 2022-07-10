import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
import { clearUser } from '../reducers/userReducer'
import { Navbar, Nav, Button } from 'react-bootstrap'
import { useDispatch } from 'react-redux'

const NavBar = () => {
  const user = useSelector(({ currentUser }) => currentUser)
  const padding = {
    padding: 5
  }
  const dispatch = useDispatch()
  const logout = () => {
    dispatch(clearUser(null))
  }
  if(user) {
    return(
      <Navbar collapseOnSelect expand="lg" bg="dark" variant="dark">
        <Navbar.Toggle aria-controls="responsive-navbar-nav" />
        <Navbar.Collapse id="responsive-navbar-nav">
          <Nav className="me-auto">
            <Nav.Link href="#" as="span">
              <Link to="/">blogs</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <Link to="/users">users</Link>
            </Nav.Link>
            <Nav.Link href="#" as="span">
              <em style={padding}>{user.username} logged in</em>
              <Button onClick={logout}>log out</Button>
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
    )
  }
}

export default NavBar