import { useState } from 'react'
import PropTypes from 'prop-types'

const Blog = ({ blog, updateBlog, user, deleteBlog }) => {
  const [expanded, setExpanded] = useState(false)

  const toggleView = () => {
    setExpanded(!expanded)
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

  const removeBtnVisibility = { display: checkUserForDeleteBtn() }

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }
  if(expanded) {
    return(
      <div className='blogElementExpanded' style={blogStyle}>
        <div>
          {blog.title} {blog.author}
          <button onClick={toggleView}>hide</button>
        </div>
        <div>
          {blog.url}
        </div>
        <div>
          likes <span className='likesQuantity'>{blog.likes}</span>
          <button onClick={likeBlog}>like</button>
        </div>
        <div>
          {blog.user.name}
        </div>
        <div style={removeBtnVisibility}>
          <button onClick={removeBlog}>remove</button>
        </div>
      </div>
    )
  }
  return(
    <div className='blogElement' style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleView}>view</button>
      </div>
    </div>
  )}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  updateBlog: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired,
  deleteBlog: PropTypes.func.isRequired
}

export default Blog