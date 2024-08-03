/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import { getBooksSchema } from '../../../schema/bookStoreApplication/getBooksSchema';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const URL_API_GET_BOOK = `${BASE_URL}BookStore/v1/Books`;
let user;

const getBookRequest = (accessToken) => {
    const options = {
        method: 'GET',
        url: URL_API_GET_BOOK,
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

When('I get book', () => {
    ignoreUncaughtExceptions();
    cy.window().then((win) => {
        win.sessionStorage.clear();
    });
    cy.fixture('user').then(userData => {
        user = userData;

        const options = getBookRequest(user.token);
        cy.request(options).then(response => {
            cy.writeFile('cypress/fixtures/bookDetails.json', response.body.books[0]);
            expect(response.status).to.equal(200);
            expect(response.body).to.be.jsonSchema(getBooksSchema);
            expect(response.statusText).to.eq('OK');
        });
    });
});