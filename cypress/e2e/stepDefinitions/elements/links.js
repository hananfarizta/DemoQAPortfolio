/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Cypress.Commands.add('checkLinkResponse', (selector, statusCode, statusText) => {
    cy.get(selector).click();
    cy.on('window:alert', (str) => {
        expect(str).to.equal(`${statusText} - ${statusCode}`);
    });
});

Given('I open the links page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}links`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

Then('I should verify the links page', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', BASE_URL);
});

When('I click the home link', () => {
    ignoreUncaughtExceptions();
    cy.get('#simpleLink').invoke('removeAttr', 'target').click();
});

When('I click the dynamic link', () => {
    ignoreUncaughtExceptions();
    cy.get('#dynamicLink').invoke('removeAttr', 'target').click();
});

When('I click the {string} link and see a {string} {string} response', (linkId, expectedStatus, expectedText) => {
    ignoreUncaughtExceptions();
    cy.checkLinkResponse(`#${linkId}`, expectedStatus, expectedText);
});