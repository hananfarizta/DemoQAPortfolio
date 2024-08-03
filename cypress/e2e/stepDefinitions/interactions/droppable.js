/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import '@4tw/cypress-drag-drop';

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the droppable page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}droppable`, { headers: { "accept-Encoding": "gzip, deflate" } });
    cy.wait(200);
});

When('I drag and drop the simple element', () => {
    ignoreUncaughtExceptions();
    cy.get('#draggable').drag('#droppable > p', { force: true });
});

Then('I should see the text {string} in the simple drop area', (text) => {
    ignoreUncaughtExceptions();
    cy.get('#droppable > p').should('contain.text', text);
});

When('I switch to the Accept tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#droppableExample-tab-accept').click();
    cy.get('#droppableExample-tabpane-accept').should('be.visible');
});

When('I drag and drop the acceptable element', () => {
    ignoreUncaughtExceptions();
    cy.get('#acceptable').drag('#acceptDropContainer > #droppable', { force: true });
});

When('I drag and drop the not acceptable element', () => {
    ignoreUncaughtExceptions();
    cy.get('#notAcceptable').drag('#acceptDropContainer > #droppable', { force: true });
});

Then('I should see the text {string} in the accept drop area', (text) => {
    ignoreUncaughtExceptions();
    cy.get('#acceptDropContainer > #droppable > p').should('contain.text', text);
});

When('I switch to the Prevent Propagation tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#droppableExample-tab-preventPropogation').click();
});

When('I drag and drop the element to the outer drop area', () => {
    ignoreUncaughtExceptions();
    cy.get('#dragBox').drag('#notGreedyDropBox > :nth-child(1)', { force: true });
});

When('I drag and drop the element to the greedy drop area', () => {
    ignoreUncaughtExceptions();
    cy.get('#dragBox').drag('#greedyDropBoxInner', { force: true });
});

Then('I should see the text {string} in the outer drop area', (text) => {
    ignoreUncaughtExceptions();
    cy.get('#notGreedyDropBox > :nth-child(1)').should('contain.text', text);
});

Then('I should see the text {string} in the greedy drop area', (text) => {
    ignoreUncaughtExceptions();
    cy.get('#greedyDropBoxInner > p').should('contain.text', text);
});

When('I switch to the Revert Draggable tab', () => {
    ignoreUncaughtExceptions();
    cy.get('#droppableExample-tab-revertable').click();
});

When('I drag and drop the revertable element', () => {
    ignoreUncaughtExceptions();
    cy.get('#revertable').then($el => {
        const initialPosition = $el.position();
        Cypress.env('initialPosition', initialPosition);
        cy.get('#revertable').drag('#revertableDropContainer > #droppable', { force: true });
        cy.wait(200);
    });
});

Then('I should see the element revert to its original position', () => {
    ignoreUncaughtExceptions();
    const initialPosition = Cypress.env('initialPosition');
    cy.get('#revertable').should($el => {
        const newPosition = $el.position();
        expect(newPosition.top).to.equal(initialPosition.top);
        expect(newPosition.left).to.equal(initialPosition.left);
    });
});

When('I drag and drop the not revertable element', () => {
    ignoreUncaughtExceptions();
    cy.get('#notRevertable').then($el => {
        const initialPosition = $el.position();
        Cypress.env('initialPosition', initialPosition);
        cy.get('#notRevertable').drag('#revertableDropContainer > #droppable', { force: true });
        cy.wait(200);
    });
});

Then('I should see the element not revert to its original position', () => {
    ignoreUncaughtExceptions();
    const initialPosition = Cypress.env('initialPosition');
    cy.get('#notRevertable').should($el => {
        const newPosition = $el.position();
        expect(newPosition.top).not.to.equal(initialPosition.top);
        expect(newPosition.left).not.to.equal(initialPosition.left);
    });
});

Then('I should see the text {string} in the revertable drop area', (text) => {
    ignoreUncaughtExceptions();
    cy.get('#revertableDropContainer > #droppable > p').should('have.text', text);
});