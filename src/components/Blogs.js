import { useRef, useEffect } from 'react'
import CreateBlog from './CreateBlog'
import Togglable from './Togglable'
import blogService from '../services/blogs'
import { useDispatch, useSelector } from 'react-redux'
import { blogsInitializer, addBlog } from '../reducers/blogsReducer'
import { notificate } from '../reducers/notificationReducer'
import { clearUser } from '../reducers/userReducer'
import { Link } from 'react-router-dom'
import { Table } from 'react-bootstrap'



const Blogs = () => {
  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(blogsInitializer())
  }, [])
  const blogs = useSelector(({ blogs }) => {
    let blogsCopy = [...blogs].sort((a, b) => b.likes - a.likes)
    return blogsCopy
  })
  const user = useSelector(({ currentUser }) => currentUser)
  const errorHandler = (error) => {
    if (error.response.data.error ==='token expired')
    {
      dispatch(notificate('Your session expired', 'error'))
      dispatch(clearUser())
    } else {
      dispatch(notificate(error.response.data.error, 'error'))
    }
  }
  const createBlog = async (newBlog) => {
    try {
      const response = await blogService.createNewBlog(newBlog)
      dispatch(addBlog(response))
      blogFormRef.current.toggleVisibility()
      dispatch(notificate('New blog added', 'success'))
    }
    catch(error) {
      errorHandler(error)
    }
  }

  const blogFormRef = useRef()
  return(
    <div className="container">
      {user && <Togglable buttonLabel='New blog' ref={blogFormRef}>
        <CreateBlog addBlog={createBlog} />
      </Togglable>
      }
      <br></br>
      <Table striped>
        <tbody>
          {user && blogs.map(blog =>
            <tr key={blog.id}>
              <td><Link to={`/blogs/${blog.id}`} >{blog.title}</Link></td>
              <td>{blog.author}</td>
            </tr>
          )}
        </tbody>
      </Table>
    </div>
  )
}

export default Blogs