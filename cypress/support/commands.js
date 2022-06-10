// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

Cypress.Commands.add('createBlog', ({title, author, url}) => {
  cy.get('button').contains('button' ,'New blog').click()
  cy.contains('title').find('input').type(title)
  cy.contains('author').find('input').type(author)
  cy.contains('url').find('input').type(url)
  cy.contains('create').click()
  cy.intercept('/api/blogs').as('create')
  cy.wait('@create')
})