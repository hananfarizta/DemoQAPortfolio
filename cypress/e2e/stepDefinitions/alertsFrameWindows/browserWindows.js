/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the browser windows page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}browser-windows`);
    cy.wait(200);
});

When('I click the tab button', () => {
    ignoreUncaughtExceptions();
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen').callsFake((url) => {
            win.location.href = url;
        });
    });
    cy.get('#tabButton').click();
});

Then('a new tab should open with the correct content', () => {
    ignoreUncaughtExceptions();
    cy.get('@windowOpen').should('be.called');
    cy.get('@windowOpen').then((stub) => {
        const newTabUrl = stub.args[0][0];
        cy.visit(newTabUrl);
        cy.get('#sampleHeading').should('have.text', 'This is a sample page');
    });
});

When('I click the window button', () => {
    ignoreUncaughtExceptions();
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen').callsFake((url) => {
            win.location.href = url;
        });
    });
    cy.get('#windowButton').click();
});

Then('a new window should open with the correct content', () => {
    ignoreUncaughtExceptions();
    cy.get('@windowOpen').should('be.called');
    cy.get('@windowOpen').then((stub) => {
        const newWindow = stub.args[0][0];
        cy.visit(newWindow);
        cy.get('#sampleHeading').should('have.text', 'This is a sample page');
    });
});

When('I click the message window button', () => {
    ignoreUncaughtExceptions();
    cy.window().then((win) => {
        cy.stub(win, 'open').as('windowOpen').callsFake((url) => {
            win.location.href = url;
        });
    });
    cy.get('#messageWindowButton').click();
});

Then('a new window should open with a message', () => {
    ignoreUncaughtExceptions();
    cy.get('@windowOpen').should('be.called');
    cy.get('@windowOpen').then((stub) => {
        const newWindow = stub.args[0][0];
        cy.visit(newWindow);
        cy.get('body', { timeout: 10000 }).should('exist');
    });
});