Feature: Login Functionality

    Background:
        Given I open the login page

    Scenario: Login Successfully
        When I am logged in
        Then I should be redirected to the profile page
