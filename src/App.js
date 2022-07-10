import Login from './components/Login'
import Notification from './components/Notification'
import Blogs from './components/Blogs'
import {
  BrowserRouter as Router,
  Routes, Route
} from 'react-router-dom'
import Users from './components/Users'
import User from './components/User'
import BlogView from './components/BlogView'
import NavBar from './components/NavBar'

const App = () => {

  return (
    <Router>
      <Notification />
      <NavBar />
      <Login />
      <Routes>
        <Route path="/" element={<Blogs />} />
        <Route path="/users" element={<Users />} />
        <Route path="/users/:id" element={<User />} />
        <Route path="/blogs/:id" element={<BlogView />} />
      </Routes>
    </Router>
  )
}

export default App
