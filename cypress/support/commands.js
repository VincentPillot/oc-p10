// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })

//Permet d'avoir la selection get data-cy sans avoir à le répéter.
Cypress.Commands.add("getDataCy", (selector, ...args) => {
  return cy.get(`[data-cy=${selector}]`, ...args)
})


const apiUrl = Cypress.env('apiUrl');
/*********************************************************************************************************/
/*********************************************************************************************************/
/******************************************* LOGIN API****************************************************/
/*********************************************************************************************************/
/*********************************************************************************************************/

Cypress.Commands.add('loginApi', (useValidCredentials = true) => {
  // Charger la fixture
  cy.fixture('credentials').then((credentials) => {
    // Sélectionner les identifiants en fonction du paramètre
    const username = useValidCredentials ? credentials.validMail : credentials.wrongMail;
    const password = useValidCredentials ? credentials.validPassword : credentials.wrongPassword;

    cy.request({
      method: 'POST',
      url: `${apiUrl}/login`,
      body: { username, password },
      failOnStatusCode: false,
    }).then((response) => {
      if (useValidCredentials) {
        expect(response.status).to.eq(200);
        // Stocker le jeton d'authentification
        window.localStorage.setItem('authToken', response.body.token);
      } else {
        expect(response.status).to.eq(401);
      }
    });
  });
});


/*********************************************************************************************************/
/*********************************************************************************************************/
/******************************************* LOGIN MANUEL ************************************************/
/*********************************************************************************************************/
/*********************************************************************************************************/
Cypress.Commands.add('login', (useValidCredentials = true) => {
  // Charger la fixture
  cy.fixture('credentials').then((credentials) => {
    // Sélectionner les identifiants en fonction du paramètre
    const username = useValidCredentials ? credentials.validMail : credentials.wrongMail;
    const password = useValidCredentials ? credentials.validPassword : credentials.wrongPassword;

    //On se rend sur la page de login
    cy.visit(Cypress.env('baseUrl'));
    cy.getDataCy("nav-link-login").should('exist').click();

    // On vérifie que la page de connexion est affichée
    cy.get('form').should('exist');

    //On se connecte
    cy.getDataCy("login-input-username").type(username);
    cy.getDataCy("login-input-password").type(password);
    cy.getDataCy("login-submit").click();
  });
});

/*********************************************************************************************************/
/*********************************************************************************************************/
/******************************************* GET TOKEN ***************************************************/
/*********************************************************************************************************/
/*********************************************************************************************************/

Cypress.Commands.add("getToken", () => {
  cy.fixture('credentials').then((credentials) => {
    const username = credentials.validMail;
    const password = credentials.validPassword;

    return cy.request({
      method: "POST",
      url: apiUrl + "/login",
      body: {
        username: username,
        password: password,
      }, 
    }).then((response) => {
      return response.body.token;
    });
  });
});