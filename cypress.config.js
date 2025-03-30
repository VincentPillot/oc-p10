
const { defineConfig } = require("cypress")

module.exports = {
  e2e: {
    video: true,
    setupNodeEvents(on, config) {
      require('cypress-mochawesome-reporter/plugin')(on); // <- Bien vérifier cette ligne
      return config;
      // implement node event listeners here
    },
    env: {
      baseUrl: "http://localhost:8080",
      apiUrl: "http://localhost:8081",
    },
    reporter: 'cypress-mochawesome-reporter',  // <- Le nom exact du package
    reporterOptions: {
      reportDir: 'cypress/reports',
      overwrite: false,
      html: true,
      json: true
    },
  },
};
