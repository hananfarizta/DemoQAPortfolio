/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the nested frames page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}nestedframes`);
    cy.wait(200);
});

When('I check the content of the parent frame', () => {
    ignoreUncaughtExceptions();
    cy.get('#frame1').then($frame => {
        const $body = $frame.contents().find('body');
        cy.wrap($body).as('parentBody').should('contain', 'Parent frame');
    });
});

Then('I should see the correct content in the parent frame', () => {
    cy.get('@parentBody').should('contain', 'Parent frame');
});

When('I check the content of the child frame', () => {
    ignoreUncaughtExceptions();
    cy.get('@parentBody').find('iframe').then($childFrame => {
        const $childBody = $childFrame.contents().find('body');
        cy.wrap($childBody).as('childBody').should('contain', 'Child Iframe');
    });
});

Then('I should see the correct content in the child frame', () => {
    cy.get('@childBody').should('contain', 'Child Iframe');
});