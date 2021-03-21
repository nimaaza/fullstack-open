describe('Note app', function () {
  beforeEach(function () {
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

  describe('when logged in', function () {
    beforeEach(function () {
      cy.contains('log in').click();
      cy.get('#username').type('root');
      cy.get('#password').type('123456');
      cy.get('#login-button').click();
      cy.contains('Nima logged in');
    });

    it('a new note can be created', function () {
      cy.contains('new note').click();
      cy.get('#new-note').type('a note created by cypress');
      cy.contains('save').click();
      cy.contains('a note created by cypress');
    });
  });
});
