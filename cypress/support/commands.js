const addContext = require('mochawesome/addContext');
const _ = require('lodash');

Cypress.Commands.add("text", { prevSubject: true }, (subject, options) => {
    return subject.text();
});

Cypress.Commands.add("reportLog", (context) => {
  cy.once("test:after:run", (test) => addContext({ test }, context))
});

Cypress.Commands.add("reportLogKV", (context, value) => {
  cy.once("test:after:run", (test) => addContext({ test }, {
    title: context,
    value: value
  }))
});

/**
 * This Command stores a value to Test State
 * 
 * @param {String} Key - Key to be stored
 * @param {String} Value - Value to be stored
 */
 Cypress.Commands.add("saveState", (key, value) => {
  cy.log(key, value);
  if(key.includes(">")){
    let keyItems = key.split(">");
    cy.readFile('cypress/fixtures/state/store.json').then((currState) => {
      let newState = currState;
      _.set(newState, keyItems, value);
      cy.writeFile('cypress/fixtures/state/store.json', newState);
    })
  }else{
  cy.readFile('cypress/fixtures/state/store.json').then((currState) => {
    currState[key] = value;
    cy.writeFile('cypress/fixtures/state/store.json', currState);
 })
}

});


/**
 * This Command retrieves a param value stored in Test State
 * 
 * @param {String} Key - stored param key
 */
 Cypress.Commands.add("getState", (key) => {
  if(key.includes(">")){
    let keyItems = key.split(">");
    cy.readFile('cypress/fixtures/state/store.json').then((state) => {
      return _.get(state, keyItems);
    })
  }else{
    cy.readFile('cypress/fixtures/state/store.json').then((state) => {
      return state[key];
    })
  }
});

/**
 * This Command clears the Test State
 * 
 */
 Cypress.Commands.add("clearState", () => {
  cy.readFile('cypress/fixtures/state/store.json').then((currState) => {
    currState = {};
    cy.writeFile('cypress/fixtures/state/store.json', currState);
 })
  cy.log("Test state was reset");
});