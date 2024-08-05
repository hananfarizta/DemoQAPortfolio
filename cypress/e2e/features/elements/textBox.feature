Feature: Validate text box functionality

    Background:
        Given I open the text box page

    Scenario: Validate Text Box successfully
        When I fill in the text box with random data
        Then I should see the entered data displayed correctly

    Scenario: Validate error Text Box
        When I fill in the text box with error data
        Then I should see the error
