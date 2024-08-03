/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import 'cypress-real-events/support';

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the menu page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}menu`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I click on Main Item 1', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(1) > a').click();
});

Then('I should be on the same page', () => {
    ignoreUncaughtExceptions();
    cy.url().should('eq', `${BASE_URL}menu#`);
});

When('I hover over Main Item 2', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(2) > a').realHover();
    cy.wait(1000); // Berikan waktu agar menu dapat terbuka
});

Then('I should see the sub items', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(2) > ul')
        .should('exist')
        .and('be.visible');
});

When('I hover over Sub Sub List', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(2) > ul > li:nth-child(3) > a').realHover();
    cy.wait(1000); // Berikan waktu agar sub menu dapat terbuka
});

Then('I should see the sub sub items', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(2) > ul > li:nth-child(3) > ul')
        .should('exist')
        .and('be.visible');

    cy.get('#nav > li:nth-child(2) > ul > li:nth-child(3) > ul > li:nth-child(1)')
        .should('be.visible');

    cy.get('#nav > li:nth-child(2) > ul > li:nth-child(3) > ul > li:nth-child(2)')
        .should('be.visible');
});

When('I click on Main Item 3', () => {
    ignoreUncaughtExceptions();
    cy.get('#nav > li:nth-child(3) > a').click();
});