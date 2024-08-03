Feature: Validate nested frames functionality

    Background:
        Given I open the nested frames page

    Scenario: Validate Nested Frame - successfully
        When I check the content of the parent frame
        Then I should see the correct content in the parent frame
        And I check the content of the child frame
        Then I should see the correct content in the child frame
