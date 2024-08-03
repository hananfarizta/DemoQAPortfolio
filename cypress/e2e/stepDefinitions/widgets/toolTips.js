/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the tool tips page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}tool-tips`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I hover over the button', () => {
    ignoreUncaughtExceptions();
    cy.get('#toolTipButton').trigger('mouseover');
});

Then('I should see the tooltip for the button', () => {
    ignoreUncaughtExceptions();
    cy.get('.tooltip-inner').should('be.visible').and('contain.text', 'You hovered over the Button');
});

When('I hover over the input text field', () => {
    ignoreUncaughtExceptions();
    cy.get('#toolTipTextField').trigger('mouseover');
});

Then('I should see the tooltip for the input text field', () => {
    ignoreUncaughtExceptions();
    cy.get('.tooltip-inner').should('be.visible').and('contain.text', 'You hovered over the text field');
});

When('I hover over the text', () => {
    ignoreUncaughtExceptions();
    cy.get('#texToolTopContainer > :nth-child(1)').trigger('mouseover');
});

Then('I should see the tooltip for the text', () => {
    ignoreUncaughtExceptions();
    cy.get('.tooltip-inner').should('be.visible').and('contain.text', 'You hovered over the Contrary');
});

When('I hover over the numbers', () => {
    ignoreUncaughtExceptions();
    cy.get('#texToolTopContainer > :nth-child(2)').trigger('mouseover');
});

Then('I should see the tooltip for the numbers', () => {
    ignoreUncaughtExceptions();
    cy.get('.tooltip-inner').should('be.visible').and('contain.text', 'You hovered over the 1.10.32');
});