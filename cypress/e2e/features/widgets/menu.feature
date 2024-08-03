Feature: Validate menu functionality

    Background:
        Given I open the menu page

    Scenario: Validate Main Item 1 Successfully
        When I click on Main Item 1
        Then I should be on the same page

    Scenario: Validate Main Item 2 and Sub Sub Items Successfully
        When I hover over Main Item 2
        Then I should see the sub items
        And I hover over Sub Sub List
        Then I should see the sub sub items

    Scenario: Validate Main Item 3 Successfully
        When I click on Main Item 3
        Then I should be on the same page
