import { useState } from 'react'
import { Form, Button } from 'react-bootstrap'

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
      <Form onSubmit={createBlogHandler}>
        <Form.Group>
          <Form.Label>title:</Form.Label>
          <Form.Control
            value={title}
            type='text'
            onChange={({ target }) => setTitle(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>author:</Form.Label>
          <Form.Control
            value={author}
            type='text'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </Form.Group>
        <Form.Group>
          <Form.Label>url:</Form.Label>
          <Form.Control
            value={url}
            type='text'
            onChange={({ target }) => setUrl(target.value)}
          />
        </Form.Group>
        <Button variant="primary" type="submit">create</Button>
      </Form>
    </div>
  )
}

export default CreateBlog