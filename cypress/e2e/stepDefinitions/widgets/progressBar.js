/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the progress bar page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}progress-bar`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I start and stop the progress bar', () => {
    ignoreUncaughtExceptions();
    cy.get('.progress-bar').invoke('attr', 'aria-valuenow').then(initialValue => {
        cy.wrap(initialValue).as('initialValue');

        cy.get('#startStopButton').click();
        cy.wait(2000); // Tunggu beberapa saat untuk perubahan yang terlihat
        cy.get('#startStopButton').click();
    });
});

Then('the progress bar should have moved', () => {
    ignoreUncaughtExceptions();
    cy.get('@initialValue').then(initialValue => {
        cy.get('.progress-bar').invoke('attr', 'aria-valuenow').should('not.equal', initialValue);
    });
});

When('I start the progress bar until it reaches 100%', () => {
    ignoreUncaughtExceptions();
    cy.get('#startStopButton').click();

    cy.get('.progress-bar', { timeout: 20000 }).should('have.attr', 'aria-valuenow', '100');
});

Then('the progress bar should be full', () => {
    ignoreUncaughtExceptions();
    cy.get('.progress-bar').should('have.attr', 'aria-valuenow', '100');
});

Then('the progress bar should be green', () => {
    ignoreUncaughtExceptions();
    cy.get('.progress-bar').should('have.class', 'bg-success');
});