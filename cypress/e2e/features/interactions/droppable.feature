Feature: Validate droppable functionality

    Background:
        Given I open the droppable page

    Scenario: Simple Tab - Successfully
        When I drag and drop the simple element
        Then I should see the text "Dropped!" in the simple drop area

    Scenario: Accept Tab - ACCEPTABLE - Successfully
        When I switch to the Accept tab
        And I drag and drop the acceptable element
        Then I should see the text "Dropped!" in the accept drop area

    Scenario: Accept Tab - NOT ACCEPTABLE - Successfully
        When I switch to the Accept tab
        And I drag and drop the not acceptable element
        Then I should see the text "Drop here" in the accept drop area

    Scenario: Prevent Propagation Tab - OUTER - Successfully
        When I switch to the Prevent Propagation tab
        And I drag and drop the element to the outer drop area
        Then I should see the text "Dropped!" in the outer drop area

    Scenario: Prevent Propagation Tab - GREEDY - Successfully
        When I switch to the Prevent Propagation tab
        And I drag and drop the element to the greedy drop area
        Then I should see the text "Dropped!" in the greedy drop area

    Scenario: Revert Draggable - WILL REVERT - Successfully
        When I switch to the Revert Draggable tab
        And I drag and drop the revertable element
        Then I should see the element revert to its original position
        And I should see the text "Dropped!" in the revertable drop area

    Scenario: Revert Draggable - NOT REVERT - Successfully
        When I switch to the Revert Draggable tab
        And I drag and drop the not revertable element
        Then I should see the element not revert to its original position
        And I should see the text "Dropped!" in the revertable drop area
