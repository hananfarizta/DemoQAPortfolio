Feature: Validate sortable functionality

    Background:
        Given I open the sortable page

    Scenario: Validate elements on the Grid - Successfully
        When I sort the elements in the grid
        Then grid elements should be sorted correctly

    Scenario: Validate elements on the List - Successfully
        When I sort the elements in the list
        Then list elements should be sorted correctly
