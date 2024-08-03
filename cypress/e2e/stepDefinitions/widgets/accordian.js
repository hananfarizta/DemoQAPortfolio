/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the accordion page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}accordian`);
});

Then('I should see the content of "What is Lorem Ipsum?" section', () => {
    ignoreUncaughtExceptions();
    cy.get('#section1Content > p').should('contain.text', 'Lorem Ipsum');
});

When('I click on the "Where does it come from?" heading', () => {
    ignoreUncaughtExceptions();
    cy.get('#section2Heading').click();
});

Then('I should see the content of "Where does it come from?" section', () => {
    ignoreUncaughtExceptions();
    cy.get('#section2Content > p').should('contain.text', 'Contrary to popular belief');
});

When('I click on the "Why do we use it?" heading', () => {
    ignoreUncaughtExceptions();
    cy.get('#section3Heading').click();
});

Then('I should see the content of "Why do we use it?" section', () => {
    ignoreUncaughtExceptions();
    cy.get('#section3Content > p').should('contain.text', 'The point of using Lorem Ipsum');
});