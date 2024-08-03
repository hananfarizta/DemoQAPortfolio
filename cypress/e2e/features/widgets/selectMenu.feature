Feature: Validate select menu functionality

    Background:
        Given I open the select menu page

    Scenario: Select Value - Successfully validate
        When I select a value from the group options
        Then the selected value should be displayed

    Scenario: Select One - Successfully validate
        When I select an option from the single select dropdown
        Then the one selected option should be displayed

    Scenario: Old Style Select Menu - Successfully validate
        When I select an option from the old style select menu
        Then the old selected option should be displayed

    Scenario: Multiselect Drop Down - Successfully validate
        When I select multiple options from the multiselect dropdown
        Then the drop down selected options should be displayed

    Scenario: Standard Multi Select - Successfully validate
        When I select multiple options from the standard multi-select dropdown
        Then the standard selected options should be displayed
