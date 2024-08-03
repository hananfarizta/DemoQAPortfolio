/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the modal dialogs page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}modal-dialogs`);
    cy.wait(200);
});

When('I open the small modal', () => {
    ignoreUncaughtExceptions();
    cy.get('#showSmallModal').click();
});

Then('I should see the small modal content', () => {
    ignoreUncaughtExceptions();
    cy.get('.modal-content').within(() => {
        cy.get('.modal-body').should('have.text', 'This is a small modal. It has very less content');
    });
});

Then('I close the small modal', () => {
    ignoreUncaughtExceptions();
    cy.get('.modal-content').within(() => {
        cy.get('.modal-footer button').contains('Close').click();
    });
});

When('I open the large modal', () => {
    ignoreUncaughtExceptions();
    cy.get('#showLargeModal').click();
});

Then('I should see the large modal content', () => {
    ignoreUncaughtExceptions();
    cy.get('.modal-content').within(() => {
        cy.get('#example-modal-sizes-title-lg').should('have.text', 'Large Modal');
    });
});

Then('I close the large modal', () => {
    ignoreUncaughtExceptions();
    cy.get('.modal-content').within(() => {
        cy.get('#closeLargeModal').contains('Close').click();
    });
});