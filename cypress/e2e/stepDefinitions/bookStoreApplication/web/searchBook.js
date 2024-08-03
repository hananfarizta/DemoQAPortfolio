/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

When('I search for a book with the keyword {string}', (keyword) => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}books`);
    cy.get('#searchBox').clear().type(keyword, { delay: 200 });
});

Then('I should see the book {string} by {string} from {string}', (bookTitle, author, publisher) => {
    ignoreUncaughtExceptions();
    cy.get('.rt-tbody')
        .should('contain.text', bookTitle)
        .and('contain.text', author)
        .and('contain.text', publisher);
});