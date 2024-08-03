Feature: Validate radio button functionality

    Background:
        Given I open the radio button page

    Scenario: Check Radio Box YES successfully
        When I check the "yes" radio button
        Then I should see the text "Yes"

    Scenario: Check Radio Box Impressive successfully
        When I check the "impressive" radio button
        Then I should see the text "Impressive"

    Scenario: Validate No Radio Button is Disabled
        When the No radio button should be disabled
