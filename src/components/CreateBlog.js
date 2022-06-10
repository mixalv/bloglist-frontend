import { useState } from 'react'

const CreateBlog = ({ addBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')
  const createBlogHandler = (event) => {
    event.preventDefault()
    const newBlog = { title, author, url }
    addBlog(newBlog)
    setAuthor('')
    setUrl('')
    setTitle('')
  }
  return(
    <div>
      <h1>Create new</h1>
      <form onSubmit={createBlogHandler}>
        <div>
          title:
          <input
            value={title}
            type='text'
            onChange={({ target }) => setTitle(target.value)}
          />
        </div>
        <div>
          author:
          <input
            value={author}
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </div>
        <div>
          url:
          <input
            value={url}
            type='text'
            onChange={({ target }) => setUrl(target.value)}
          />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default CreateBlog