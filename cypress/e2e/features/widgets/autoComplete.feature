Feature: Validate auto complete functionality

    Background:
        Given I open the auto complete page

    Scenario: Multiples color names - Successfully
        When I type and select multiple color names
        Then the selected color names should be visible in the multiple values container

    Scenario: Single color names - Successfully
        When I type and select a single color name
        Then the selected color name should be visible in the single value container
