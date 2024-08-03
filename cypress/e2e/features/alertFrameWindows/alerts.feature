Feature: Validate alerts functionality

    Background:
        Given I open the alerts page

    Scenario: Click button to see alert successfully
        When I click the alert button
        Then I should see an alert with text "You clicked a button"

    Scenario: Button click, alert will appear after 5 seconds successfully
        When I click the timer alert button
        Then I should see an alert with text "This alert appeared after 5 seconds"

    Scenario: YES - Button click, confirm box will appear successfully
        When I click the confirm button
        Then I should see a confirm box with text "Do you confirm action?"
        And I should see a result text "You selected Ok"

    Scenario: YES - on button click, prompt box will appear successfully
        When I click the prompt button
        And I should see the prompt result with the entered name
