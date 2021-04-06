describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/test/reset');
    cy.request('POST', 'http://localhost:3003/api/users', {
      name: 'Nima',
      username: 'root',
      password: '123456',
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
      enterCredentials('root', '123456');
      cy.contains('welcome back Nima');
      cy.contains('Nima logged in');
    });

    it('fails with wrong credentials', function () {
      enterCredentials('nima', '123456');
      cy.contains('login failed: Request failed with status code 401');

      enterCredentials('root', '1234567');
      cy.contains('login failed: Request failed with status code 401');
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
    });
  });
});
