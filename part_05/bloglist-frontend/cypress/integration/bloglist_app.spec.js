const USERNAME = 'root';
const PASSWORD = '123456';

describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Nima',
      username: USERNAME,
      password: PASSWORD,
    });
    cy.visit('http://localhost:3000');
  });

  it('login form is shown', function () {
    cy.contains('login to application');
    cy.contains('username');
    cy.contains('password');
    cy.contains('login');
  });

  describe('Login functions properly', function () {
    function enterCredentials(username, password) {
      cy.visit('http://localhost:3000');
      cy.get('#username').type(username);
      cy.get('#password').type(password);
      cy.get('#login').click();
    }

    it('succeeds with correct credentials', function () {
      enterCredentials(USERNAME, PASSWORD);
      cy.contains('welcome back Nima');
      cy.contains('Nima logged in');
    });

    it('fails with wrong credentials', function () {
      enterCredentials('nima', PASSWORD);
      cy.contains('login failed: Request failed with status code 401');

      enterCredentials(USERNAME, '1234567');
      cy.contains('login failed: Request failed with status code 401');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login(USERNAME, PASSWORD);
    });

    it('A blog can be created', function () {
      cy.get('#create-new').click();
      cy.get('#input-title').type('new title');
      cy.get('#input-author').type('new author');
      cy.get('#input-url').type('new-url.com');
      cy.get('#input-create').click();
      cy.contains('new title');
    });
  });
});
