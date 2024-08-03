Feature: Validate resizable functionality

    Background:
        Given I open the resizable page

    Scenario: Limit Size - Successfully
        When I resize the element with size restriction
        Then I should see the element resized to 500px by 300px

    Scenario: Unlimited Size - Successfully
        When I resize the element without size restriction
        Then I should see the element resized to 700px by 400px
