describe("test si le champ de disponibilité d'un produit es present", () => {
    beforeEach(() => {
      cy.visit(Cypress.env('baseUrl'));
    })

    it("Recuperer le champ de disponiblité d'un produit", () => {
      cy.getDataCy("product-home-link").first().click(); //On se rend sur la page du premier produit de la homepage
      cy.getDataCy("detail-product-stock").should('exist').invoke('text').should('not.be.empty'); //On verifie que le champ existe et qu'il contient bien du texte
    })
  })