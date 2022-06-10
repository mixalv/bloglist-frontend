import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Blog from './Blog'

describe('blog tests', () => {
  let user
  let blog
  let mockHandler
  const userE = userEvent.setup()

  beforeEach(() => {
    mockHandler = jest.fn()

    user = {
      username: 'Mike',
      name: 'Mi',
      id: '62978ec8810ace82d26dfec5'
    }

    blog = {
      title: 'some title',
      author: 'ya',
      url: 'some url',
      likes: 0,
      user: {
        username: 'Mike',
        name: 'Mi',
        id: '62978ec8810ace82d26dfec5'
      },
      id: '629b8b933f1d175638ca9e5d'
    }

    render(<Blog blog={blog} user={user} updateBlog={mockHandler} />)
  })

  test('renders default blog', () => {



    const title = screen.queryByText('some title')
    expect(title).toBeDefined()
    const author = screen.queryByText('ya')
    expect(author).toBeDefined()
    const url = screen.queryByText('some url')
    expect(url).toBeNull()
    const likes = screen.queryByText('0')
    expect(likes).toBeNull()

  })

  test('clicking the button expands blog', async () => {
    const button = screen.getByText('view')
    await userE.click(button)
    const url = screen.queryByText('some url')
    expect(url).toBeDefined()
    const likes = screen.queryByText('0')
    expect(likes).toBeDefined()
  })

  test('clicking like button calls function', async () => {
    const viewButton = screen.getByText('view')
    await userE.click(viewButton)
    const button = screen.getByText('like')
    await userE.click(button)
    await userE.click(button)
    expect(mockHandler.mock.calls).toHaveLength(2)

  })
})

