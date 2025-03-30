describe('test presence champs & boutons de connexion', () => {
  beforeEach(() => {
    cy.visit(Cypress.env('baseUrl'));
  })

  it('check si le bouton de connexion es présent', () => {
    cy.getDataCy("nav-link-login").should('exist');
  })

  it('verification de la presence des champs dans le formulaire de login', () => {
    cy.getDataCy("nav-link-login").click(); //On se rend sur la page de login

    //On recuperer les inputs
    cy.getDataCy("login-input-username").should('exist');
    cy.getDataCy("login-input-password").should('exist');
    cy.getDataCy("login-submit").should('exist');
  })
})