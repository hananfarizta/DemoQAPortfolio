Feature: Validate tabs functionality

    Background:
        Given I open the tabs page

    Scenario: Successfully switches between tabs
        When I switch to the Origin tab
        Then the Origin tab should be active and visible
        And the Origin tab content should be displayed

        When I switch to the Use tab
        Then the Use tab should be active and visible
        And the Use tab content should be displayed

        When I check the More tab
        Then the More tab should be disabled

        When I switch to the What tab
        Then the What tab should be active and visible
        And the What tab content should be displayed
