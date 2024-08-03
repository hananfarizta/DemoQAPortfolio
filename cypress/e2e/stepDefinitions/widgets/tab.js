/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the tabs page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}tabs`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I switch to the Origin tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-origin')
        .click()
        .should('have.class', 'active')
        .and('be.visible');
});

Then('the Origin tab should be active and visible', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-origin').should('have.class', 'active').and('be.visible');
});

Then('the Origin tab content should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tabpane-origin').should('contain.text', 'Contrary to popular belief, Lorem Ipsum is not simply random text');
});

When('I switch to the Use tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-use')
        .click()
        .should('have.class', 'active')
        .and('be.visible');
});

Then('the Use tab should be active and visible', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-use').should('have.class', 'active').and('be.visible');
});

Then('the Use tab content should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tabpane-use').should('contain.text', 'It is a long established fact that a reader');
});

When('I check the More tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-more').should('have.class', 'disabled');
});

Then('the More tab should be disabled', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-more').should('have.class', 'disabled');
});

When('I switch to the What tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-what')
        .click()
        .should('have.class', 'active')
        .and('be.visible');
});

Then('the What tab should be active and visible', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tab-what').should('have.class', 'active').and('be.visible');
});

Then('the What tab content should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#demo-tabpane-what > .mt-3').should('contain.text', 'Lorem Ipsum is simply dummy text of the printing and typesetting industry.');
});