Feature: Book Store Functionality

    Background:
        Given I open the login page
        When I am logged in

    Scenario: Search book Successfully
        Then I search for a book with the keyword "java"
        When I should see the book "Speaking JavaScript" by "Axel Rauschmayer" from "O'Reilly Media"
