Feature: Validate tool tips functionality

    Background:
        Given I open the tool tips page

    Scenario: Successfully hover over a button
        When I hover over the button
        Then I should see the tooltip for the button

    Scenario: Successfully hover over Input Text
        When I hover over the input text field
        Then I should see the tooltip for the input text field

    Scenario: Successfully hover over text
        When I hover over the text
        Then I should see the tooltip for the text

    Scenario: Successfully hover over numbers
        When I hover over the numbers
        Then I should see the tooltip for the numbers
