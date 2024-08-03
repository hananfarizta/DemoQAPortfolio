/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the select menu page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}select-menu`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I select a value from the group options', () => {
    ignoreUncaughtExceptions();
    cy.get('#withOptGroup').click();
    cy.get('#react-select-2-option-1-0').should('be.visible').click();
});

Then('the selected value should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#withOptGroup').should('contain.text', 'Group 2, option 1');
});

When('I select an option from the single select dropdown', () => {
    ignoreUncaughtExceptions();
    cy.get('#selectOne').click();
    cy.get('#react-select-3-input').should('be.visible');
    cy.get('#react-select-3-group-0-heading').should('be.visible');
    cy.get('#react-select-3-option-0-2').click();
});

Then('the one selected option should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#selectOne').should('contain.text', 'Mrs.');
});

When('I select an option from the old style select menu', () => {
    ignoreUncaughtExceptions();
    cy.get('#oldSelectMenu').should('be.visible').select('3');
});

Then('the old selected option should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#oldSelectMenu').then(select => {
        const selectedText = select.find('option:selected').text();
        const trimmedSelectedText = Cypress.$.trim(selectedText);
        expect(trimmedSelectedText).to.equal('Yellow');
    });
});

When('I select multiple options from the multiselect dropdown', () => {
    ignoreUncaughtExceptions();
    cy.get('#selectMenuContainer > div:nth-child(8) > div > div').should('be.visible').click();
    cy.get('#react-select-4-option-0').should('be.visible').click();
    cy.get('#react-select-4-option-1').should('be.visible').click();
});

Then('the drop down selected options should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('.css-1rhbuit-multiValue').should('contain.text', 'Green').and('contain.text', 'Blue');
});

When('I select multiple options from the standard multi-select dropdown', () => {
    ignoreUncaughtExceptions();
    cy.get('#cars').should('be.visible').select(['volvo', 'audi']);
});

Then('the standard selected options should be displayed', () => {
    ignoreUncaughtExceptions();
    cy.get('#cars option:selected').then(selectedOptions => {
        const selectedValues = [...selectedOptions].map(option => option.value);
        expect(selectedValues).to.include.members(['volvo', 'audi']);
    });
});