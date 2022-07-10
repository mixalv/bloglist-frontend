import { useDispatch, useSelector } from 'react-redux'
import blogService from '../services/blogs'
import { notificate } from '../reducers/notificationReducer'
import helper from '../utils/helper'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { blogInitializer } from '../reducers/blogReducer'
import { setBlog } from '../reducers/blogReducer'
import CommentForm from './CommentForm'
import { Button } from 'react-bootstrap'


const BlogView = () => {
  const id = useParams().id
  const dispatch = useDispatch()
  useEffect( () => {
    dispatch(blogInitializer(id))
  }, [dispatch] )
  const blog = useSelector(({ blog }) => blog)
  const user = useSelector(({ currentUser }) => currentUser)
  const updateBlog = async(blog) => {
    try {
      const response = await blogService.updateBlog(blog)
      dispatch(setBlog(response))

    }
    catch(error) {
      helper.errorHandler(error)
    }
  }

  const deleteBlog = async (blog) => {
    try{
      await blogService.deleteBlog(blog.id)
      dispatch(removeBlog(blog.id))
      dispatch(notificate(`blog "${blog.title}" is successfully removed`, 'success'))
    }
    catch(error) {
      helper.errorHandler(error)
    }

  }
  const likeBlog = () => {
    const newBlog = { ...blog, likes: blog.likes+1, user: blog.user.id }
    updateBlog(newBlog)
  }

  const removeBlog = () => {
    if (window.confirm(`Do you really want to remove the blog ${blog.title}?`)) {
      deleteBlog(blog)
    }

  }

  const checkUserForDeleteBtn = () => {
    if(blog.user.username === user.username) {
      return ''
    }
    return 'none'
  }
  if (blog && user) {
    return(
      <div className="container">
        <div>
          <h1>{blog.title} {blog.author}</h1>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes <span className='likesQuantity'>{blog.likes}</span>
          <Button onClick={likeBlog}>like</Button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={{ display: checkUserForDeleteBtn() }}>
          <Button onClick={removeBlog}>remove</Button>
        </div>
        <h1>comments</h1>
        <CommentForm id={blog.id} />
        <ul>
          {blog.comments.map( (c, i) => <li key={i}>{c}</li>)}
        </ul>
      </div>
    )
  }
  else {
    return null
  }
}

export default BlogView