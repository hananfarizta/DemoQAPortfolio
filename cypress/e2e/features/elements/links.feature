Feature: Validate links functionality

    Background:
        Given I open the links page

    Scenario: HOME link
        When I click the home link
        Then I should be on the homepage

    Scenario: DYNAMIC link
        When I click the dynamic link
        Then I should be on the homepage

    Scenario: CREATED link
        When I click the "created" link and see a "201" "Created" response

    Scenario: NO CONTENT link
        When I click the "no-content" link and see a "204" "No Content" response

    Scenario: MOVED link
        When I click the "moved" link and see a "301" "Moved Permanently" response

    Scenario: BAD REQUEST link
        When I click the "bad-request" link and see a "400" "Bad Request" response

    Scenario: UNAUTHORIZED link
        When I click the "unauthorized" link and see a "401" "Unauthorized" response

    Scenario: FORBIDDEN link
        When I click the "forbidden" link and see a "403" "Forbidden" response

    Scenario: NOT FOUND link
        When I click the "invalid-url" link and see a "404" "Not Found" response
