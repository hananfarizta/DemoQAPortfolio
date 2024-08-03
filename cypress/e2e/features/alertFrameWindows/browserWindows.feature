Feature: Validate browser windows functionality

    Background:
        Given I open the browser windows page

    Scenario: New Tab - Successfully
        When I click the tab button
        Then a new tab should open with the correct content

    Scenario: New Window - Successfully
        When I click the window button
        Then a new window should open with the correct content

    Scenario: New Window Message - Successfully
        When I click the message window button
        Then a new window should open with a message
