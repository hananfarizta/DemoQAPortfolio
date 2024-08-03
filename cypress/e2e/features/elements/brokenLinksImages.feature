Feature: Validate broken links and images functionality

    Background:
        Given I open the broken links and images page

    Scenario: Detect a valid image
        Then I should see a valid image

    Scenario: Detect a broken image
        Then I should see a broken image

    Scenario: Detect a valid link
        When I click the valid link
        Then I should be on the homepage

    Scenario: Detect a broken link
        When I click the broken link
        Then I should be on the broken link page
