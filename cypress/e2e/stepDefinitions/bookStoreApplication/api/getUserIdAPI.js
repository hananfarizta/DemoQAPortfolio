/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getUserIdSchema } from '../../../schema/bookStoreApplication/getUserIdSchema';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
let user;

const getUserIDRequest = (accessToken, userId) => {
    const options = {
        method: 'GET',
        url: `${BASE_URL}Account/v1/User/${userId}`,
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

When('I get user id', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(userData => {
        user = userData;
    });
});

Then('I should see the user id', () => {
    ignoreUncaughtExceptions();

    const options = getUserIDRequest(user.token, user.id);
    cy.request(options).then(response => {
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(getUserIdSchema);
        expect(response.statusText).to.eq('OK');
    });
});