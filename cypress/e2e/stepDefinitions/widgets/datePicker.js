/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";

const BASE_URL = Cypress.config('baseUrl');

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

Given('I open the date picker page', () => {
    ignoreUncaughtExceptions();
    cy.visit(`${BASE_URL}date-picker`, { headers: { "accept-Encoding": "gzip, deflate" } });
});

When('I select a date and should be displayed correctly', () => {
    ignoreUncaughtExceptions();
    const month = '6';
    const year = '2000';
    const date = 20;
    const monthSelect = (parseInt(month) + 1).toString().padStart(2, '0');

    cy.get('#datePickerMonthYearInput')
        .click()
        .clear();

    cy.get('.react-datepicker__month-select').select(month);
    cy.get('.react-datepicker__year-select').select(year);
    cy.contains('.react-datepicker__day', date).click();

    cy.get('#datePickerMonthYearInput')
        .invoke('val')
        .should('contain', `${monthSelect}/${date}/${year}`);
});

When('I select a date and time and should be displayed correctly', () => {
    ignoreUncaughtExceptions();
    const month = 'July';
    const year = '2000';
    const date = 20;
    const hour = '11:00';
    const amPm = 'AM';

    const formattedDate = `${month} ${date}, ${year}`;
    const formattedTime = `${hour} ${amPm}`;

    cy.get('#dateAndTimePickerInput')
        .click()
        .clear();

    cy.get('.react-datepicker__month-read-view').click();
    cy.contains('.react-datepicker__month-option', month).click();

    cy.get('.react-datepicker__year-read-view').click();

    function selectYear(year) {
        cy.get('.react-datepicker__year-dropdown')
            .find('.react-datepicker__year-option')
            .then(yearOptions => {
                const years = yearOptions.map((i, option) => option.textContent).get();
                if (!years.includes(year.toString())) {
                    cy.get('.react-datepicker__navigation.react-datepicker__navigation--years.react-datepicker__navigation--years-previous').click();
                    cy.wait(500);
                    selectYear(year);
                } else {
                    cy.contains('.react-datepicker__year-option', year.toString()).click();
                }
            });
    }
    cy.get('.react-datepicker__year-read-view')
        .invoke('text')
        .then(text => {
            if (text !== '2000') {
                selectYear(2000);
            }
        });

    cy.contains('.react-datepicker__day', date).click();
    cy.get('.react-datepicker__time-list-item').contains(hour).click();

    cy.get('#dateAndTimePickerInput')
        .invoke('val')
        .should('contain', formattedDate)
        .and('contain', formattedTime);
});