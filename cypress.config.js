const { defineConfig } = require('cypress')

module.exports = defineConfig({
  projectId: 'HEM',
  viewportWidth: 1920,
  viewportHeight: 1080,
  pageLoadTimeout: 60000,
  requestTimeout: 30000,
  responseTimeout: 60000,
  defaultCommandTimeout: 10000,
  chromeWebSecurity: false,
  reporter: 'mochawesome',
  retries: {
    runMode: 2,
    openMode: 0,
  },
  env: {
    marketplace_api_server: "http://localhost:8080/hem/v1/",
    armm_api_server: "http://localhost:8040",
    DB: {
      user: 'armm',
      host: '127.0.0.1',
      database: 'postgres',
      password: 'armm',
      port: 5432,
    },
  },
  e2e: {
    // We've imported your old cypress plugins here.
    // You may want to clean this up later by importing these.
    setupNodeEvents(on, config) {
      return require('./cypress/plugins/index.js')(on, config)
    },
    specPattern: 'cypress/e2e/**/features/**/*.{feature,features}',
    excludeSpecPattern: '**/pages/*,**/common/*',
    experimentalSessionAndOrigin: false,
  },
})
