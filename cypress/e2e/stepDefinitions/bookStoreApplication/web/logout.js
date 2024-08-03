/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Then('I log out successfully', () => {
    ignoreUncaughtExceptions();
    cy.get('#books-wrapper > .text-right > #submit').click();
});

Then('I should be redirected to the login page', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', `${BASE_URL}login`);
});