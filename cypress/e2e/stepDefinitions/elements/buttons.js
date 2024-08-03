/// <reference types="cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the buttons page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}buttons`);
});

When('I double click the double click button', () => {
    ignoreUncaughtExceptions();
    cy.get('#doubleClickBtn').dblclick();
});

Then('I should see a double click message', () => {
    ignoreUncaughtExceptions();
    cy.get('#doubleClickMessage').should('have.text', 'You have done a double click');
});

When('I right click the right click button', () => {
    ignoreUncaughtExceptions();
    cy.get('#rightClickBtn').rightclick();
});

Then('I should see a right click message', () => {
    ignoreUncaughtExceptions();
    cy.get('#rightClickMessage').should('have.text', 'You have done a right click');
});

When('I click the click me button', () => {
    ignoreUncaughtExceptions();
    cy.contains('button', /^Click Me$/).click();
});

Then('I should see a dynamic click message', () => {
    ignoreUncaughtExceptions();
    cy.get('#dynamicClickMessage').should('have.text', 'You have done a dynamic click');
});