Feature: Validate accordion functionality

    Background:
        Given I open the accordion page

    Scenario: Validate "What is Lorem Ipsum?" section
        Then I should see the content of "What is Lorem Ipsum?" section

    Scenario: Validate "Where does it come from?" section
        When I click on the "Where does it come from?" heading
        Then I should see the content of "Where does it come from?" section

    Scenario: Validate "Why do we use it?" section
        When I click on the "Why do we use it?" heading
        Then I should see the content of "Why do we use it?" section
