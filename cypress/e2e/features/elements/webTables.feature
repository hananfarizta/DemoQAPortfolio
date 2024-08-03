Feature: Validate web tables functionality

    Background:
        Given I open the web tables page

    Scenario: Adding New User successfully
        When I add a new user
        Then the new user should be added successfully

    Scenario: Editing an email from New User successfully
        When I add a new user
        And I edit the email of the new user
        Then the email should be updated successfully

    Scenario: Delete a New User Registered successfully
        When I add a new user
        And I delete the new user
        Then the new user should be deleted successfully

    Scenario: Find a New User typing on Search Box field Successfully
        When I add a new user
        And I search for the new user
        Then the new user should be found successfully

    Scenario: Change Number of Rows on the table successfully
        When I change the number of rows to 5
        Then the table should display 5 rows
