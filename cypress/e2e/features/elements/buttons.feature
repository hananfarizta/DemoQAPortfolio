Feature: Validate Buttons Functionality

    Background:
        Given I open the buttons page

    Scenario: Double click button
        When I double click the double click button
        Then I should see a double click message

    Scenario: Right click button
        When I right click the right click button
        Then I should see a right click message

    Scenario: Click me button
        When I click the click me button
        Then I should see a dynamic click message