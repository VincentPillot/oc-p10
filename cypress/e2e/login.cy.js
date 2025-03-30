describe('Test de Connexion', () => {
    it('Doit permettre à l user de se connecter avec succès et d avoir le panier de disponible', () => {
        cy.login(true)

        // On verifie la présence du panier
        cy.getDataCy("nav-link-cart").should('exist');
    });    
  });