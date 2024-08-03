/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the auto complete page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}auto-complete`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I type and select multiple color names', () => {
    ignoreUncaughtExceptions();
    const name1 = 'g';
    const name2 = 'y';
    const nameSug1 = 'Green';
    const nameSug2 = 'Yellow';

    cy.get('#autoCompleteMultipleContainer').type(name1, { delayed: 200 });
    cy.get('.auto-complete__menu')
        .should('be.visible', { timeout: 10000 })
        .contains(nameSug1)
        .click();

    cy.get('#autoCompleteMultipleContainer').type(name2, { delayed: 200 });
    cy.get('.auto-complete__menu')
        .should('be.visible', { timeout: 10000 })
        .contains(nameSug2)
        .click();
});

Then('the selected color names should be visible in the multiple values container', () => {
    ignoreUncaughtExceptions();
    cy.get('.auto-complete__multi-value')
        .should('be.visible')
        .should('contain', 'Green')
        .and('contain', 'Yellow');
});

When('I type and select a single color name', () => {
    ignoreUncaughtExceptions();
    const typedText = 'b';
    const suggestedName = 'Blue';
    cy.get('#autoCompleteSingle').type(typedText, { delay: 200 });

    cy.get('.auto-complete__menu')
        .should('be.visible', { timeout: 10000 })
        .contains(suggestedName)
        .click();
});

Then('the selected color name should be visible in the single value container', () => {
    ignoreUncaughtExceptions();
    cy.get('.auto-complete__single-value')
        .should('have.text', 'Blue');
});