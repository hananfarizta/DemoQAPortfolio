Feature: Validate forms functionality

    Background:
        Given I open the registration form page

    Scenario: Registration Form Successfully
        When I fill in the registration form with "valid" data
        Then the form should be submitted successfully

    Scenario: Registration Form Error
        When I fill in the registration form with "invalid" data
        Then verify the error
