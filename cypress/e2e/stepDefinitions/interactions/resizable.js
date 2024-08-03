/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the resizable page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}resizable`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I resize the element with size restriction', () => {
    ignoreUncaughtExceptions();
    cy.get('#resizableBoxWithRestriction').should('be.visible').as('resizableElement');
    cy.get('#resizableBoxWithRestriction > .react-resizable-handle')
        .trigger('mousedown', { clientX: 200, clientY: 200, force: true })
        .trigger('mousemove', { clientX: 500, clientY: 300, force: true })
        .trigger('mouseup', { force: true });
});

Then('I should see the element resized to {int}px by {int}px', (width, height) => {
    ignoreUncaughtExceptions();
    cy.get('@resizableElement').should('have.css', 'width', `${width}px`);
    cy.get('@resizableElement').should('have.css', 'height', `${height}px`);
});

When('I resize the element without size restriction', () => {
    ignoreUncaughtExceptions();
    cy.get('#resizable').should('be.visible').as('resizableElement');
    cy.get('#resizable > .react-resizable-handle')
        .trigger('mousedown', { clientX: 200, clientY: 200, force: true })
        .trigger('mousemove', { clientX: 700, clientY: 400, force: true })
        .trigger('mouseup', { force: true });
});