Feature: Validate dynamic properties functionality

    Background:
        Given I open the dynamic properties page

    Scenario: Get dynamic ID
        Then I should see the paragraph with random ID

    Scenario: Enable the button after 5 seconds
        Then the button should be enabled after 5 seconds

    Scenario: Change color after 5 seconds
        Then the button should change color after 5 seconds

    Scenario: Be visible after 5 seconds
        Then the button should be visible after 5 seconds
