Feature: Validate slider functionality

    Background:
        Given I open the slider page

    Scenario: Successfully moves the slider to a specific value
        When I move the slider to a specific value
        Then the slider should display the correct value
