/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
let user;

const deleteBookRequest = (accessToken, userId) => {
    const options = {
        method: 'DELETE',
        url: `${BASE_URL}BookStore/v1/Books?UserId=${userId}`,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        failOnStatusCode: false
    }
    return options;
}

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

When('I delete book', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(userData => {
        user = userData;

        const options = deleteBookRequest(user.token, user.id);
        cy.request(options).then(response => {
            expect(response.status).to.equal(204);
            expect(response.statusText).to.eq('No Content');
        });
    });
});