describe('Tests d\'API', () => {
  const apiUrl = Cypress.env('apiUrl');

  // Données de test
  const productId = 6;
  let authToken;

  // TESTS DE CONNEXION
  it('devrait retourner une erreur 401 pour un utilisateur inconnu', () => {
    cy.loginApi(false).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('devrait se connecter avec succès pour un utilisateur connu', () => {
    cy.loginApi(true).then((response) => {
      expect(response.status).to.eq(200);
      authToken = window.localStorage.getItem("authToken");
      Cypress.env('authToken', authToken);
    });
  });

  // TESTS NECESSITANT D'ÊTRE CONNECTÉ
  it('devrait retourner une erreur 401 pour une requête non authentifiée', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/orders`,
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(401);
    });
  });

  it('devrait retourner la fiche d\'un produit spécifique', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/products/${productId}`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  // TESTS PANIER
  it('devrait retourner la liste des produits dans le panier', () => {
    cy.request({
      method: 'GET',
      url: `${apiUrl}/orders`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('devrait ajouter un produit disponible au panier', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/orders/add`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
      body: { product: 5, quantity: 3 },
    }).then((response) => {
      expect(response.status).to.eq(200);
    });
  });

  it('devrait renvoyer une erreur si le stock demandé est supérieur au stock disponible', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/orders/add`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
      failOnStatusCode: false,
      body: { product: 5, quantity: 359854 },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  it('devrait renvoyer une erreur si le produit es en rupture de stock', () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/orders/add`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
      failOnStatusCode: false,
      body: { product: 3, quantity: 2 },
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });  

  it("devrait renvoyer une erreur si l'id du produit n'est pas le bon", () => {
    cy.request({
      method: 'PUT',
      url: `${apiUrl}/orders/add`,
      headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
      body: { product: 55555555, quantity: 2 },
      failOnStatusCode: false,
    }).then((response) => {
      expect(response.status).to.eq(400);
    });
  });

  // TESTS AJOUT AVIS
  it('devrait ajouter un avis valide', () => {
    cy.fixture('comments').then((comments) => {
      const validComment = comments.validComment;

      cy.request({
        method: 'POST',
        url: `${apiUrl}/reviews`,
        headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
        body: validComment,
      }).then((response) => {
        expect(response.status).to.eq(200);
      });
    });
  });

  it('devrait renvoyer le commentaire formater', () => {
    cy.fixture('comments').then((comments) => {
      const xssComment = comments.xssComment;

      cy.request({
        method: 'POST',
        url: `${apiUrl}/reviews`,
        headers: { Authorization: `Bearer ${Cypress.env('authToken')}` },
        body: xssComment,
      }).then((response) => {
        expect(response.status).to.eq(200);
        cy.log(JSON.stringify(response.body));
        console.log("body : " + response.body);
        expect(response.body.title).to.not.eq(xssComment.title);
        expect(response.body.comment).to.not.eq(xssComment.comment)
      });
    });
  });
});
