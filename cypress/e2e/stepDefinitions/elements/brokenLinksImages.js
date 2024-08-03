/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the broken links and images page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}broken`, { retryOnStatusCodeFailure: true, retryOnNetworkFailure: true });
});

Then('I should see a valid image', () => {
    ignoreUncaughtExceptions();
    cy.get('img:nth-child(3)')
        .should('be.visible')
        .invoke('prop', 'naturalWidth')
        .should('be.gt', 0);
});

Then('I should see a broken image', () => {
    ignoreUncaughtExceptions();
    cy.get('img:nth-child(7)')
        .should('be.visible')
        .and('have.prop', 'naturalWidth', 0);
});

When('I click the valid link', () => {
    ignoreUncaughtExceptions();
    cy.get('a[href="http://demoqa.com"]').click({ force: true });
});

Then('I should be on the homepage', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', 'https://demoqa.com/');
});

When('I click the broken link', () => {
    ignoreUncaughtExceptions();
    cy.get('a[href="http://the-internet.herokuapp.com/status_codes/500"]').click({ force: true });
});

Then('I should be on the broken link page', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', 'http://the-internet.herokuapp.com/status_codes/500');
});