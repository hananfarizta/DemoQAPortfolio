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

const form = {
    firstName: faker.name.firstName(),
    lastName: faker.name.lastName(),
    email: faker.internet.email(),
    mobile: faker.datatype.number({ min: 1000000000, max: 9999999999 }),
    subject: faker.random.words(2),
    address: faker.address.streetAddress(),
};
const file = 'cypress/assets/demo.png';

Given('I open the registration form page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}automation-practice-form`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I fill in the registration form with {string} data', (string) => {
    ignoreUncaughtExceptions();

    if (string == 'valid') {
        cy.get('#firstName').type(form.firstName);
        cy.get('#lastName').type(form.lastName);
        cy.get('#userEmail').type(form.email);
        cy.get('#genterWrapper > .col-md-9 > :nth-child(3) > .custom-control-label').click();
        cy.get('#userNumber').type(form.mobile);

        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__month-select').select('11');
        cy.get('.react-datepicker__year-select').select('1978');
        cy.get('.react-datepicker__day--015').click();

        cy.get('#subjectsInput').type(form.subject);
        cy.get("label[for='hobbies-checkbox-3']").click();
        cy.get('#uploadPicture').selectFile(file);

        cy.get('#currentAddress').type(form.address);

        cy.get('#state > div > div.css-1hwfws3').click();
        cy.get('#react-select-3-option-1').click();

        Cypress.env('form', form);
    } else if (string == 'invalid') {
        cy.get('#firstName').type(form.firstName);
        cy.get('#lastName').type(form.lastName);
        cy.get('#userEmail').type(form.firstName);
        cy.get('#genterWrapper > .col-md-9 > :nth-child(3) > .custom-control-label').click();
        cy.get('#userNumber').type(form.mobile);

        cy.get('#dateOfBirthInput').click();
        cy.get('.react-datepicker__month-select').select('11');
        cy.get('.react-datepicker__year-select').select('1978');
        cy.get('.react-datepicker__day--015').click();

        cy.get('#subjectsInput').type(form.subject);
        cy.get("label[for='hobbies-checkbox-3']").click();
        cy.get('#uploadPicture').selectFile(file);

        cy.get('#currentAddress').type(form.address);

        cy.get('#state > div > div.css-1hwfws3').click();
        cy.get('#react-select-3-option-1').click();
    }
});

Then('the form should be submitted successfully', () => {
    ignoreUncaughtExceptions();

    cy.get('#submit').click();
    cy.get('.modal-header').should('contain.text', 'Thanks for submitting the form');
    cy.wait(1000);
    cy.get('#closeLargeModal').click({ force: true });
});


Then('verify the error', () => {
    ignoreUncaughtExceptions();

    cy.get('#userEmail').should('have.css', 'border-color', 'rgb(206, 212, 218)');
});