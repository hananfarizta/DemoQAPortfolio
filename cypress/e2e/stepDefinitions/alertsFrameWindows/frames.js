/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the frames page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}frames`);
    cy.wait(200);
});

When('I check the content of the bigger frame', () => {
    ignoreUncaughtExceptions();
    cy.get('#frame1').then(($frame) => {
        const $iframeBody = $frame.contents().find('body');
        cy.wrap($iframeBody).find('h1').should('have.text', 'This is a sample page');
    });
});

When('I check the content of the smaller frame', () => {
    ignoreUncaughtExceptions();
    cy.get('#frame2').then(($frame) => {
        const $iframeBody = $frame.contents().find('body');
        cy.wrap($iframeBody).find('h1').should('have.text', 'This is a sample page');
    });
});