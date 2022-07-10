import { useState } from 'react'
import blogService from '../services/blogs'
import { concatComment } from '../reducers/blogReducer'
import helper from '../utils/helper'
import { useDispatch } from 'react-redux'
import { Form, Button } from 'react-bootstrap'

const CommentForm = ( { id } ) => {
  const [comment, setComment] = useState('')
  const dispatch = useDispatch()
  const addComment = async ( event ) => {
    event.preventDefault()
    try {
      await blogService.addComment(id, comment)
      dispatch(concatComment(comment))
      setComment('')
    }
    catch(error) {
      helper.errorHandler(error)
    }

  }
  return(
    <div className="container">
      <Form onSubmit={addComment} >
        <Form.Group>
          <Form.Control type='text' onChange={({ target }) => setComment(target.value)} value={comment} />
          <Button variant="primary" type='submit'>add comment</Button>
        </Form.Group>
      </Form>
    </div>
  )
}

export default CommentForm