Feature: Logout Functionality

    Background:
        Given I open the login page
        When I am logged in

    Scenario: Logout Successfully
        Then I should be redirected to the profile page
        And I log out successfully
        Then I should be redirected to the login page
