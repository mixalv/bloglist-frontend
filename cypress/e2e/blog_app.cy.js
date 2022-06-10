describe('Blog app', function() {
  beforeEach(function() {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    cy.request('POST', 'localhost:3003/api/users', {
      name: 'Mike',
      password: '12345',
      username: 'Mike'
    })
    cy.visit('http://localhost:3000')
  })

  it('Login form is shown', function() {
    cy.contains('Login to application')
    cy.contains('username')
    cy.contains('password')
    cy.get('form')
    cy.contains('login')
  })

  describe('Login',function() {
    it('succeeds with correct credentials', function() {
      cy.contains('username').find('input').type('Mike')
      cy.contains('password').find('input').type('12345')
      cy.contains('login').click()
      cy.get('.success')
    })

    it('fails with wrong credentials', function() {

      cy.contains('username').find('input').type('Mike')
      cy.contains('password').find('input').type('1234')
      cy.contains('login').click()
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)')

    })
  })

  describe('When logged in', function() {
    beforeEach(function() {
      cy.request('POST', 'localhost:3003/api/login', {
        username: 'Mike',
        password: '12345'
      }).then( response => {
        localStorage.setItem('loggedUser', JSON.stringify(response.body))
        cy.visit('http://localhost:3000')
      })

    })

    it('A blog can be created', function() {
      const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'blog url'
      }
      cy.createBlog(blog)
      // cy.contains('New blog').click()
      // cy.contains('title').find('input').type('blog title')
      // cy.contains('author').find('input').type('blog author')
      // cy.contains('url').find('input').type('blog url')
      // cy.contains('create').click()
      cy.get('.success').should('contain', 'New blog added')
      cy.contains(blog.title)
      cy.contains(blog.author)
    })

    it('A blog can be liked', () => {
      const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'blog url'
      }
      cy.createBlog(blog)
      cy.get('.blogContainer').eq(0).contains('view').click()
      cy.get('.likesQuantity').invoke('text').then(oldLikes => {
        cy.get('.blogElementExpanded').contains('like').click()
        cy.intercept('/api/blogs').as('getBlogs')
        cy.wait('@getBlogs')
        cy.get('.likesQuantity').invoke('text').then(newLikes => {
          expect(Number(oldLikes)).to.eq(Number(newLikes)-1)
        })

      })

    })

    it('A blog can be deleted', () => {
      const blog = {
        title: 'blog title',
        author: 'blog author',
        url: 'blog url'
      }
      cy.createBlog(blog)
      cy.get('.blogContainer').eq(0).contains('view').click()
      cy.contains('remove').click()
      cy.intercept('/api/blogs*').as('deleteBlog')
      cy.wait('@deleteBlog')
      cy.get('.success').should('contain', `blog "${blog.title}" is successfully removed`)
    })

    it.only('blogs are sorted by likes', () => {
      cy.createBlog({
        title: 'blog with most likes',
        author: 'blog author',
        url: 'blog url'
      })

      cy.createBlog({
        title: 'blog without likes',
        author: 'blog author',
        url: 'blog url'
      })

      cy.createBlog(
        {
          title: 'blog with 1 like',
          author: 'blog author',
          url: 'blog url'
        }
      )

      cy.contains('blog with most likes').contains('view').click()
      function likeBlog () {
        cy.contains('button' ,'like').click()
        cy.intercept('/api/blogs*').as('getBlogs')
        cy.wait('@getBlogs')
      }
      likeBlog()
      likeBlog()
      likeBlog()
      cy.contains('hide').click()
      cy.contains('blog with 1 like').contains('view').click()
      likeBlog()
      cy.contains('hide').click()
      cy.wait(2000)
      cy.get('.blogElement').eq(0).should('contain', 'blog with most likes')
      cy.get('.blogElement').eq(1).should('contain', 'blog with 1 like')
    })
  })
})