describe("Verifie que le bouton d'ajout au panier sur un produit es bien afficher lorsque que l'user es connecter", () => {
    it('verification de la presence des champs dans le formulaire de login', () => {
        cy.visit(Cypress.env('baseUrl'));
        cy.getDataCy("nav-link-login").click();

        //On recuperer les inputs et on remplis les champs
        cy.getDataCy("login-input-username").type('test2@test.fr');
        cy.getDataCy("login-input-password").type('testtest');

        //On se connecte
        cy.getDataCy("login-submit").click();


        //On se rend sur la page du premier produit de la homepage
        cy.getDataCy("product-home-link").first().click();

        //On verifie que le bouton "Ajouter au panier" existe
        cy.getDataCy("detail-product-add").should('exist');
    })
  }) 