import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import CreateBlog from './components/CreateBlog'
import Login from './components/Login'
import blogService from './services/blogs'
import loginService from './services/login'
import Notification from './components/Notification'
import Togglable from './components/Togglable'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const[user, setUser] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState(null)

  const updateBlogList = () => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }

  const notificate = (text, state) =>  {
    setMessage( { text, state })
    setTimeout(() => {
      setMessage(null)
    }, 5000)
  }


  useEffect(updateBlogList, [])

  useEffect(() => {
    const userJson = window.localStorage.getItem('loggedUser')
    if(userJson) {
      setUser(JSON.parse(userJson))
    }

  }, [])

  const blogFormRef = useRef()

  const logout = () => {
    window.localStorage.removeItem('loggedUser')
    setUser(null)
  }

  const errorHandler = (error) => {
    if (error.response.data.error ==='token expired')
    {
      notificate('Your session expired', 'error')
      logout()
    } else {
      notificate(error.response.data.error, 'error')
    }
  }

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({ username, password })
      window.localStorage.setItem(
        'loggedUser', JSON.stringify(user)
      )
      setUser(user)
      setUsername('')
      setPassword('')
      notificate('you successfully logged in', 'success')
    }
    catch(error) {
      console.log(error.response.data.error)
      notificate(error.response.data.error, 'error')
    }
  }

  const deleteBlog = async (blog) => {
    try{
      await blogService.deleteBlog(blog.id)
      notificate(`blog "${blog.title}" is successfully removed`, 'success')
      updateBlogList()
    }
    catch(error) {
      errorHandler(error)
    }

  }

  const addBlog = async (newBlog) => {
    try {
      await blogService.createNewBlog(newBlog)
      blogFormRef.current.toggleVisibility()
      updateBlogList()
      notificate('New blog added', 'success')
    }
    catch(error) {
      errorHandler(error)
    }

  }

  const updateBlog = async(blog) => {
    try {
      await blogService.updateBlog(blog)
      updateBlogList()
    }
    catch(error) {
      errorHandler(error)
    }
  }

  return (
    <div>
      <Notification message={message} />
      <Login
        user={user}
        username={username}
        setUsername={setUsername}
        password={password}
        setPassword={setPassword}
        handleLogin={handleLogin}
        logout={logout}
      />
      {user && <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <CreateBlog addBlog={addBlog} />
      </Togglable>
      }
      <br></br>
      <div className='blogContainer'>
        {user && blogs.sort((a, b) => b.likes - a.likes).map(blog =>
          <Blog key={blog.id} blog={blog} updateBlog={updateBlog} user={user} deleteBlog={deleteBlog} />
        )}
      </div>
    </div>
  )
}

export default App
