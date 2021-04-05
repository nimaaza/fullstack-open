describe('Note app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3001/api/testing/reset');
    const user = {
      name: 'Nima',
      username: 'root',
      password: '123456',
    };
    cy.request('POST', 'http://localhost:3001/api/users', user);
    cy.visit('http://localhost:3000');
  });

  it('front page can be opened', function () {
    cy.contains('Notes');
    cy.contains('Note app, Depart. of Computer Science, University of Helsinki 2020');
  });

  // an example of a failing test
  // it('front page contains random text', function(){
  //   cy.contains('wtf is this app?');
  // });

  it('login form can be opened', function () {
    cy.contains('log in').click();
    cy.get('#username').type('root');
    cy.get('#password').type('123456');
    cy.get('#login-button').click();
    cy.contains('Nima logged in');
  });

  // use .only to only run this test
  // it.only('login fails with wrong password', function () {
  it('login fails with wrong password', function () {
    cy.contains('log in').click();
    cy.get('#username').type('root');
    cy.get('#password').type('wrong');
    cy.get('#login-button').click();

    cy.get('.error')
      .should('contain', 'Wrong credentials!')
      .and('have.css', 'color', 'rgb(255, 0, 0)')
      .and('have.css', 'border-style', 'solid');

    cy.get('html').should('not.contain', 'Nima logged in');
  });

  describe('when logged in', function () {
    beforeEach(function () {
      // cy.contains('log in').click();
      // cy.get('#username').type('root');
      // cy.get('#password').type('123456');
      // cy.get('#login-button').click();
      // cy.contains('Nima logged in');

      // The code above uses the UI to do the login, but
      // the code below bypasses the UI in order to login.

      cy.login({ username: 'root', password: '123456' });
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#new-note').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });

    describe('and a note exists', function () {
      beforeEach(function () {
        cy.createNote({
          content: 'another note from Cypress',
          important: false,
        });
      });

      it('can be made important', function () {
        cy.contains('another note from Cypress')
          .contains('make important')
          .click();

        cy.contains('another note from Cypress')
          .contains('make not important');
      });
    });
  });
});
