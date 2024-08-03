/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the upload-download page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}upload-download`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I click the download button', () => {
    ignoreUncaughtExceptions();
    cy.get('#downloadButton').click();
});

Then('the file should be downloaded successfully', () => {
    ignoreUncaughtExceptions();
    cy.readFile('cypress/downloads/sampleFile.jpeg').should('exist');
});

When('I upload a file', () => {
    ignoreUncaughtExceptions();
    const filePath = 'cypress/downloads/sampleFile.jpeg';
    cy.get('#uploadFile').selectFile(filePath);
});

Then('the file should be uploaded successfully', () => {
    ignoreUncaughtExceptions();
    cy.get('#uploadedFilePath').should('contain.text', 'C:\\fakepath\\sampleFile.jpeg');
});