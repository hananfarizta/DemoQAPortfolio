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

Given('I open the alerts page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}alerts`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I click the alert button', () => {
    ignoreUncaughtExceptions();
    cy.get('#alertButton').click();
});

Then('I should see an alert with text {string}', (alertText) => {
    ignoreUncaughtExceptions();
    cy.on('window:alert', (text) => {
        expect(text).to.equal(alertText);
    });
});

When('I click the timer alert button', () => {
    ignoreUncaughtExceptions();
    cy.get('#timerAlertButton').click();
    cy.wait(6000);
});

When('I click the confirm button', () => {
    ignoreUncaughtExceptions();
    cy.get('#confirmButton').click();
});

Then('I should see a confirm box with text {string}', (confirmText) => {
    ignoreUncaughtExceptions();
    cy.on('window:confirm', (text) => {
        expect(text).to.equal(confirmText);
        return true;
    });
});

Then('I should see a result text {string}', (resultText) => {
    ignoreUncaughtExceptions();
    cy.get('#confirmResult').should('have.text', resultText);
});

When('I click the prompt button', () => {
    ignoreUncaughtExceptions();
    cy.window().then((win) => {
        cy.stub(win, 'prompt').callsFake((promptText) => {
            expect(promptText).to.equal('Please enter your name');
            const fakeName = faker.name.firstName();
            Cypress.env('fakeName', fakeName);
            return fakeName;
        });
        cy.get('#promtButton').click();
    });
});

Then('I should see the prompt result with the entered name', () => {
    ignoreUncaughtExceptions();
    const fakeName = Cypress.env('fakeName');
    cy.get('#promptResult').should('contain', fakeName);
});