Feature: Validate progress bar functionality

    Background:
        Given I open the progress bar page

    Scenario: Successfully moves the progress bar
        When I start and stop the progress bar
        Then the progress bar should have moved

    Scenario: Progress bar reaches 100%
        When I start the progress bar until it reaches 100%
        Then the progress bar should be full
        And the progress bar should be green