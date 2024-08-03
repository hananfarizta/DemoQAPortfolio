Feature: Validate selectable functionality

    Background:
        Given I open the selectable page

    Scenario: Grid Selectable - Successfully
        When I switch to the Grid tab
        And I select items from the grid
        Then grid selected items should be active

    Scenario: List Selectable - Successfully
        When I switch to the List tab
        And I select items from the list
        Then list selected items should be active
