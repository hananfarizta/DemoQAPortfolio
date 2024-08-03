Feature: Validate Check Box Functionality

    Background:
        Given I open the checkbox page

    Scenario: Check Office box
        When I expand all nodes
        And I check the Office box
        Then I should see office in the results

    Scenario: Check Desktop box
        When I expand all nodes
        And I check the Desktop box
        Then I should see desktop in the results

    Scenario: Check Downloads box
        When I expand all nodes
        And I check the Downloads box
        Then I should see downloads in the results
