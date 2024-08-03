Feature: Validate user id functionality

    Background:
        Given I have valid user credentials
        When login should be successfully

    Scenario: Successfully get user id
        When I get user id
        Then I should see the user id
