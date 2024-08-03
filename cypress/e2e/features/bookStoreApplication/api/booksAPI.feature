Feature: Validate books functionality

    Background:
        Given I have valid user credentials
        When login should be successfully

    Scenario: Successfully validate books functionality
        When I get book
        When I add book
        When I delete book
