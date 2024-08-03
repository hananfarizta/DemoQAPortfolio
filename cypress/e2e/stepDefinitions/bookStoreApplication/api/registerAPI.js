/// <reference types="Cypress" />
import { When, Then } from "@badeball/cypress-cucumber-preprocessor";
import faker from "faker";
import { registerSchema } from '../../../schema/bookStoreApplication/registerSchema';
import chaiJsonSchema from 'chai-json-schema';

chai.use(chaiJsonSchema);

const BASE_URL = Cypress.config('baseUrl');
const URL_API_CREATE_USER = `${BASE_URL}Account/v1/User`;

const createUserRequest = (userName, password) => {
    const options = {
        method: 'POST',
        url: URL_API_CREATE_USER,
        body: {
            "userName": userName,
            "password": password
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

function generatePassword() {
    const chars = {
        lower: "abcdefghijklmnopqrstuvwxyz",
        upper: "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
        digit: "0123456789",
        special: "!@#$%^&*()-_+=<>?"
    };
    const allChars = chars.lower + chars.upper + chars.digit + chars.special;
    let password = [
        chars.lower[Math.floor(Math.random() * chars.lower.length)],
        chars.upper[Math.floor(Math.random() * chars.upper.length)],
        chars.digit[Math.floor(Math.random() * chars.digit.length)],
        chars.special[Math.floor(Math.random() * chars.special.length)]
    ];

    while (password.length < 8) {
        password.push(allChars[Math.floor(Math.random() * allChars.length)]);
    }

    return password.sort(() => 0.5 - Math.random()).join('');
}

When('I create a new user', () => {
    ignoreUncaughtExceptions();
    const options = createUserRequest(faker.internet.userName(), generatePassword());
    cy.request(options).then(response => {
        console.log(response.body);
        console.log(response.body.message);
        expect(response.status).to.equal(201);
        expect(response.body).to.be.jsonSchema(registerSchema);
        expect(response.statusText).to.eq('Created');
    });
});