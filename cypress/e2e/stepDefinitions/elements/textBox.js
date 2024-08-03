/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import faker from 'faker';

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the text box page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}text-box`, { retryOnStatusCodeFailure: true, retryOnNetworkFailure: true });
});

When('I fill in the text box with random data', () => {
    ignoreUncaughtExceptions();

    const textBox = {
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        cAddress: faker.address.streetAddress(),
        pAddress: faker.address.streetAddress()
    };

    cy.get('#userName').type(textBox.userName);
    cy.get('#userEmail').type(textBox.email);
    cy.get('#currentAddress').type(textBox.cAddress);
    cy.get('#permanentAddress').type(textBox.pAddress);
    cy.get('#submit').click();

    Cypress.env('textBox', textBox);
});

Then('I should see the entered data displayed correctly', () => {
    ignoreUncaughtExceptions();

    const textBox = Cypress.env('textBox');

    cy.get('.border').invoke('text').should('include', textBox.userName);
    cy.get('.border').invoke('text').should('include', textBox.email);
    cy.get('.border').invoke('text').should('include', textBox.cAddress);
    cy.get('.border').invoke('text').should('include', textBox.pAddress);
});

When('I fill in the text box with error data', () => {
    ignoreUncaughtExceptions();

    const textBox = {
        userName: faker.internet.userName(),
        email: faker.address.streetAddress(),
        cAddress: faker.address.streetAddress(),
        pAddress: faker.address.streetAddress()
    };

    cy.get('#userName').type(textBox.userName);
    cy.get('#userEmail').type(textBox.email);
    cy.get('#currentAddress').type(textBox.cAddress);
    cy.get('#permanentAddress').type(textBox.pAddress);
    cy.get('#submit').click();
});

Then('I should see the error', () => {
    ignoreUncaughtExceptions();

    cy.get('.field-error')
        .should('have.css', 'border', '1px solid rgb(255, 0, 0)');
});