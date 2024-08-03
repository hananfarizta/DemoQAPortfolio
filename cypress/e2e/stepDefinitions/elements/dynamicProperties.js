/// <reference types="Cypress" />
import { Given, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the dynamic properties page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}dynamic-properties`);
});

Then('I should see the paragraph with random ID', () => {
    ignoreUncaughtExceptions();
    cy.contains('p', 'This text has random Id').should('be.visible');
});

Then('the button should be enabled after 5 seconds', () => {
    ignoreUncaughtExceptions();
    cy.get('#enableAfter').should('be.visible');
    cy.wait(6000);
    cy.get('#enableAfter').should('be.enabled');
});

Then('the button should change color after 5 seconds', () => {
    ignoreUncaughtExceptions();
    cy.get('#colorChange').should('be.visible');
    cy.wait(6000);
    cy.get('#colorChange').should('have.css', 'color', 'rgb(220, 53, 69)');
});

Then('the button should be visible after 5 seconds', () => {
    ignoreUncaughtExceptions();
    cy.get('#visibleAfter').should('exist');
    cy.wait(6000);
    cy.get('#visibleAfter').should('be.visible');
});