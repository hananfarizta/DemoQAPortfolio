/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const URL_API_ADD_BOOK = `${BASE_URL}BookStore/v1/Books`;
let user;

const addBookRequest = (accessToken, userId, isbn) => {
    const options = {
        method: 'POST',
        url: URL_API_ADD_BOOK,
        headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${accessToken}`
        },
        body: {
            userId: userId,
            collectionOfIsbns: [{
                "isbn": isbn
            }]
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

When('I add book', () => {
    ignoreUncaughtExceptions();
    cy.fixture('user').then(userData => {
        user = userData;
        cy.fixture('bookDetails').then(bookDetails => {
            const options = addBookRequest(user.token, user.id, bookDetails.isbn);
            cy.request(options).then(response => {
                expect(response.status).to.equal(201);
                expect(response.statusText).to.eq('Created');
            });
        });
    });
});