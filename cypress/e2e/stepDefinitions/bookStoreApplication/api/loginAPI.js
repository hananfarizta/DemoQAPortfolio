/// <reference types="Cypress" />
import { Given, When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { loginSchema } from '../../../schema/bookStoreApplication/loginSchema';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const URL_API_LOGIN = `${BASE_URL}Account/v1/Login`;
let user;

const loginRequest = (userName, password) => {
    const options = {
        method: 'POST',
        url: URL_API_LOGIN,
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

Given('I have valid user credentials', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(userData => {
        user = userData;
    });
});

When('login should be successfully', () => {
    ignoreUncaughtExceptions();
    const options = loginRequest(user.userName, user.password);
    cy.request(options).then(response => {
        if (response.status !== 200) {
            cy.log(response.body);
            throw new Error('Failed to login');
        }
        cy.writeFile('cypress/fixtures/schema.json', response.body);
        expect(response.status).to.equal(200);
        expect(response.body).to.be.jsonSchema(loginSchema);
        expect(response.statusText).to.eq('OK');

        const token = response.body.token;

        user.token = token;
        return cy.writeFile('cypress/fixtures/user.json', user).then(() => {
            return token;
        })
    });
});