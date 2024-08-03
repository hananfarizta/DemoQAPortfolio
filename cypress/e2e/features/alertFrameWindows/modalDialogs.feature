Feature: Validate modal dialogs functionality

    Background:
        Given I open the modal dialogs page

    Scenario: Validate Small Modal - Successfully
        When I open the small modal
        Then I should see the small modal content
        And I close the small modal

    Scenario: Validate Large Modal - Successfully
        When I open the large modal
        Then I should see the large modal content
        And I close the large modal
