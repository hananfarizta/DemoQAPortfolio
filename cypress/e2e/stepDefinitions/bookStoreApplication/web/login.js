/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the login page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}login`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I am logged in', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(user => {
        cy.get('#userName').type(user.userName);
        cy.get('#password').type(user.password);
    });

    cy.get('#login').click();
});

Then('I should be redirected to the profile page', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', `${BASE_URL}profile`);
});