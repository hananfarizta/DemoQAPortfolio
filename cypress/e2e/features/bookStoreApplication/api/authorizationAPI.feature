Feature: Validate user authorization successfully

    Background:
        Given I have valid user credentials

    Scenario: Successfully get authorized user
        When I get authorized user