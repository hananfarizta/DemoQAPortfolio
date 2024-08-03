/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginSchema } from '../../../schema/bookStoreApplication/loginSchema';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const URL_API_AUTHORIZATION = `${BASE_URL}Account/v1/Authorized`;
let user;

const authorizedRequest = (userName, password) => {
    const options = {
        method: 'POST',
        url: URL_API_AUTHORIZATION,
        body: {
            "userName": userName,
            "password": password
        },
        failOnStatusCode: false
    }
    return options
}

const ignoreUncaughtExceptions = () => {
    Cypress.on('uncaught:exception', (err, runnable) => {
        // returning false here prevents Cypress from failing the test
        return false;
    });
};

When('I get authorized user', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(userData => {
        user = userData;

        const options = authorizedRequest(user.userName, user.password);
        cy.request(options).then(response => {
            expect(response.body).to.eq(true);
        });
    });

});