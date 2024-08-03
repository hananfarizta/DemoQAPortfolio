/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-drag-drop';

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the sortable page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}sortable`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I sort the elements in the grid', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-grid').click();
    cy.get('.create-grid').should('be.visible');

    cy.get('.create-grid > div').first().trigger('mousedown', { which: 1, button: 0 });
    cy.wait(200);
    cy.get('.create-grid > div').last().trigger('mousemove').trigger('mouseup');
    cy.wait(200);
});

Then('grid elements should be sorted correctly', () => {
    ignoreUncaughtExceptions();
    cy.get('.create-grid > div').last().should('have.text', 'One');
});

When('I sort the elements in the list', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-list').click();
    cy.get('#demo-tabpane-list > div').should('be.visible');

    cy.get('#demo-tabpane-list > div > div').first().trigger('mousedown', { which: 1, button: 0 });
    cy.wait(200);
    cy.get('#demo-tabpane-list > div > div')
        .last()
        .trigger('mousemove')
        .trigger('mouseup');
    cy.wait(200);
});

Then('list elements should be sorted correctly', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tabpane-list > div')
        .last()
        .invoke('text')
        .should('contain', 'One');
});