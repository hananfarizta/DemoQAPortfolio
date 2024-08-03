/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the radio button page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}radio-button`);
});

When('I check the {string} radio button', (string) => {
    ignoreUncaughtExceptions();
    cy.get(`label[for='${string}Radio']`).click();
});

Then('I should see the text {string}', (string) => {
    ignoreUncaughtExceptions();
    cy.get('.text-success').should('have.text', string);
});

When('the No radio button should be disabled', () => {
    ignoreUncaughtExceptions();
    cy.get('#noRadio').should('be.disabled');
});