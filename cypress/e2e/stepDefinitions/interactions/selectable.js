/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the selectable page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}selectable`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I switch to the Grid tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-grid').click();
    cy.get('#listContainer > div').should('be.visible');
});

When('I select items from the grid', () => {
    ignoreUncaughtExceptions();
    cy.get('#row1 > li:nth-child(1)').click().should('have.class', 'active');
    cy.get('#row2 > li:nth-child(3)').click().should('have.class', 'active');
    cy.get('#row3 > li:nth-child(2)').click().should('have.class', 'active');
});

Then('grid selected items should be active', () => {
    ignoreUncaughtExceptions();
    cy.get('#row1 > li:nth-child(1)').should('have.class', 'active');
    cy.get('#row2 > li:nth-child(3)').should('have.class', 'active');
    cy.get('#row3 > li:nth-child(2)').should('have.class', 'active');
});

When('I switch to the List tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-list').click();
    cy.get('#demo-tabpane-list').should('be.visible');
});

When('I select items from the list', () => {
    ignoreUncaughtExceptions();
    cy.get('#verticalListContainer > li:nth-child(1)').click().should('have.class', 'active');
    cy.get('#verticalListContainer > li:nth-child(3)').click().should('have.class', 'active');
});

Then('list selected items should be active', () => {
    ignoreUncaughtExceptions();
    cy.get('#verticalListContainer > li:nth-child(1)').should('have.class', 'active');
    cy.get('#verticalListContainer > li:nth-child(3)').should('have.class', 'active');
});