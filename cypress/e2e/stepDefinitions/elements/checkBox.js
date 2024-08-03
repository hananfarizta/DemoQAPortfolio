/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the checkbox page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}checkbox`);
});

When('I expand all nodes', () => {
    ignoreUncaughtExceptions();
    cy.get("button[title='Expand all']", { force: true }).click();
});

When('I check the Office box', () => {
    ignoreUncaughtExceptions();
    cy.get("label[for='tree-node-office'] span[class='rct-title']")
        .should('contain.text', 'Office')
        .click();
    cy.get('.rct-option-collapse-all').click();
});

Then('I should see office in the results', () => {
    ignoreUncaughtExceptions();
    cy.get('#result').invoke('text').should('include', 'office');
});

When('I check the Desktop box', () => {
    ignoreUncaughtExceptions();
    cy.get("#tree-node > ol > li > ol > li:nth-child(1) > span")
        .should('contain.text', 'Desktop')
        .click();
    cy.get('.rct-option-collapse-all').click();
});

Then('I should see desktop in the results', () => {
    ignoreUncaughtExceptions();
    cy.get('#result').invoke('text').should('include', 'desktop');
});

Then('I should see workspace in the results', () => {
    ignoreUncaughtExceptions();
    cy.get('#result').invoke('text').should('include', 'workspace');
});

When('I check the Downloads box', () => {
    ignoreUncaughtExceptions();
    cy.get('#tree-node > :nth-child(2) > :nth-child(1) > :nth-child(2) > :nth-child(3) > :nth-child(1)')
        .should('contain.text', 'Downloads')
        .click();
    cy.get('.rct-option-collapse-all').click();
});

Then('I should see downloads in the results', () => {
    ignoreUncaughtExceptions();
    cy.get('#result').invoke('text').should('include', 'downloads');
});