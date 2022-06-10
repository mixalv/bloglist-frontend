import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import CreateBlog from './CreateBlog'

test('create new blog', async () => {
  const mockHandler = jest.fn()
  render(<CreateBlog addBlog={mockHandler} />)
  const user = userEvent.setup()
  const inputs = screen.getAllByRole('textbox')
  await user.type(inputs[0], 'title')
  await user.type(inputs[1], 'author')
  await user.type(inputs[2], 'url')
  const submitBtn = screen.getByText('create')
  await user.click(submitBtn)
  expect(mockHandler.mock.calls).toHaveLength(1)
  expect(mockHandler.mock.calls[0][0].title).toBe('title')
  expect(mockHandler.mock.calls[0][0].author).toBe('author')
  expect(mockHandler.mock.calls[0][0].url).toBe('url')

})
