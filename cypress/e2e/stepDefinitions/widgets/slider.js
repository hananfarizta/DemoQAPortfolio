/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

const stepTo = ($el, target) => {
    const step = $el[0].getAttribute('step') || 1;
    const current = $el[0].value;
    const diff = target - current;
    const steps = Math.abs(diff / step);

    if (diff > 0) {
        $el[0].stepUp(steps);
    } else {
        $el[0].stepDown(steps);
    }
};

Given('I open the slider page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}slider`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I move the slider to a specific value', () => {
    ignoreUncaughtExceptions();
    const newValue = 65;
    cy.get('input[type="range"]')
        .then($el => stepTo($el, newValue))
        .trigger('change');
    cy.wrap(newValue).as('newValue');
});

Then('the slider should display the correct value', () => {
    ignoreUncaughtExceptions();
    cy.get('@newValue').then(newValue => {
        cy.get('#sliderValue').should('have.value', newValue);
    });
});