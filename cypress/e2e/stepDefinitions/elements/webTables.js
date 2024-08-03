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

Cypress.Commands.add('addUser', (firstName, lastName, email, age, salary, department) => {
    cy.get('#firstName').type(firstName);
    cy.get('#lastName').type(lastName);
    cy.get('#userEmail').type(email);
    cy.get('#age').type(`${age}`);
    cy.get('#salary').type(`${salary}`);
    cy.get('#department').type(department);
    cy.get('#submit').click();
});

Given('I open the web tables page', () => {
    ignoreUncaughtExceptions();
    cy.clearCookies();
    cy.clearLocalStorage();
    cy.visit(`${BASE_URL}webtables`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I add a new user', () => {
    ignoreUncaughtExceptions();
    cy.get('#addNewRecordButton').click();

    const form = {
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        email: faker.internet.email(),
        age: faker.datatype.number({ min: 18, max: 80 }),
        salary: faker.datatype.number({ min: 1500, max: 5000 }),
        department: faker.random.word()
    };

    cy.addUser(
        form.firstName,
        form.lastName,
        form.email,
        form.age,
        form.salary,
        form.department
    );

    Cypress.env('form', form);
});

Then('the new user should be added successfully', () => {
    const form = Cypress.env('form');
    cy.get('div.ReactTable.-striped.-highlight')
        .should('contain', form.firstName)
        .and('contain', form.lastName)
        .and('contain', form.email)
        .and('contain', `${form.age}`)
        .and('contain', `${form.salary}`)
        .and('contain', form.department);
});

When('I edit the email of the new user', () => {
    const form = Cypress.env('form');
    const newEmail = faker.internet.email();

    cy.get(`div.ReactTable.-striped.-highlight`).contains(form.firstName).parents('div.rt-tr-group').within(() => {
        cy.get('[title="Edit"]').click();
    });

    cy.get('#userEmail')
        .clear()
        .type(newEmail);
    cy.get('#submit').click();

    Cypress.env('newEmail', newEmail);
});

Then('the email should be updated successfully', () => {
    const newEmail = Cypress.env('newEmail');
    cy.get('div.ReactTable.-striped.-highlight')
        .should('contain', newEmail);
});

When('I delete the new user', () => {
    const form = Cypress.env('form');
    cy.get('div.ReactTable.-striped.-highlight')
        .contains(form.firstName)
        .parents('div.rt-tr-group')
        .within(() => {
            cy.get('[title="Delete"]').click();
        });
});

Then('the new user should be deleted successfully', () => {
    const form = Cypress.env('form');
    cy.get('div.ReactTable.-striped.-highlight')
        .should('not.contain', form.firstName);
});

When('I search for the new user', () => {
    const form = Cypress.env('form');
    cy.get('#searchBox').type(form.firstName);
});

Then('the new user should be found successfully', () => {
    const form = Cypress.env('form');
    cy.get('div.ReactTable.-striped.-highlight')
        .should('contain', form.firstName);
});

When('I change the number of rows to 5', () => {
    cy.get("span.select-wrap.-pageSizeOptions > select").select('5');
});

Then('the table should display 5 rows', () => {
    cy.get('div.ReactTable.-striped.-highlight div.rt-tr-group')
        .should('have.length', 5);
});