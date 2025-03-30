describe('Test du Panier', () => {
  const apiUrl = Cypress.env('apiUrl');

  beforeEach(() => {
    cy.login();
    cy.url().should('include', '/'); //On verifie qu'on ai bien redirigé après la connexion
  })

  it("Ajoute un produit au panier avec un stock valide et mettre à jour ce dernier", () => {
    cy.getDataCy("product-home-link").first().click(); //On se rend sur la page du premier produit de la homepage

    cy.wait(2000); //On wait pour être sûr que toute la page se charge

    cy.getDataCy("detail-product-name").invoke("text").then((productName) => {
      cy.url().then((productUrl) => {
        cy.getDataCy('detail-product-stock')
          .invoke("text")
          .then((text) => {
            const stockText = text.trim();
            const stockNumber = parseInt(stockText.match(/\d+/)[0]);
            expect(stockNumber).to.be.greaterThan(0) //On récupére le nombre du stock et on vérifie que ce soit > a 0

            cy.getDataCy("detail-product-add").click(); //On ajoute le produit au panier
  
            //On retourne sur la page du produit, et on actualise la page pour vérifier que le stock s'est bien update
            cy.visit(productUrl);
            cy.reload();
  
            const newStock = stockNumber - 1;
            cy.log(`Stock précédent : ${stockNumber}`);
            cy.log(`Stock mis à jour : ${newStock} `)
  
            cy.getDataCy("detail-product-stock")
            .invoke("text")
            .should("match", new RegExp(`^${newStock} en stock$`));
          });
  
          cy.visit(Cypress.env('baseUrl') + "/#/cart"); //On retourne au panier
          
          cy.getDataCy("cart-line-name").invoke("text").should("match", new RegExp(`^${productName}`)) //On vérifie que le produit ajouté es bien présent et que ce soit le bon
          cy.getDataCy('cart-line-delete').click({ multiple : true }) //On supprime le produit avec multiple dans le cas ou plusieurs produits aurais été ajouter par erreur
      })
    })
  });

  it("Vérifie qu'une valeur de quantité négative n'ajoute pas le produit au panier", () => {
    cy.getDataCy("product-home-link").first().click()

    cy.wait(2000);

    cy.getDataCy("detail-product-quantity").clear().type(-5); //On ajoute notre valeur negative 
    cy.getDataCy("detail-product-add").click();
    cy.getDataCy("detail-product-form").should("have.class", "ng-invalid"); //On verfie que le detail product form contient bien le ng-invalid qui doit empecher le clic sur 'ajouter au panier'
  })

  it("Vérifie qu'une valeur de quantité supérieur à 20 n'ajoute pas le produit au panier", () => {
    cy.getDataCy("product-home-link").first().click()

    cy.wait(2000);

    cy.getDataCy("detail-product-quantity").clear().type(22); //On ajoute notre valeur superieur a 20 
    cy.getDataCy("detail-product-form").should("have.class", "ng-invalid"); //On verfie que le detail product form contient bien le ng-invalid qui doit empecher le clic sur 'ajouter au panier'
  });

  it("Doit ajouter un produit au panier et verifier que ce soit bien retourner par l'API", () => {
    let productId;

    cy.getDataCy("product-home-link").first().click();

    cy.url().then(productUrl => {
      const urlSegments = productUrl.split("/"); //On split chaque segment de l'url
      productId = parseInt(urlSegments[urlSegments.length -1]); //On recupere l'id produit présent dans le dernier segment
      cy.log(`ID du produit : ${productId}`);

      cy.wait(2000);

      cy.getDataCy("detail-product-add").click();

      cy.getToken().then((token) => {
        cy.request({
          method: "GET",
          url: apiUrl + "/orders",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }).then((response) => {
          cy.log(`Réponse de l'API : ${response.body.orderLines[0].product.id}`);
          const productIdApi = response.body.orderLines[0].product.id
          expect(productIdApi).to.equal(productId);
        });

        cy.visit(Cypress.env('baseUrl') + "/#/cart"); //On retourne au panier
        cy.getDataCy('cart-line-delete').click({ multiple : true })
      })
    });
  })
});
  