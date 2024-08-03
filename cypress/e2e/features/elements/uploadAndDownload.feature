Feature: Validate upload and download functionality

    Background:
        Given I open the upload-download page

    Scenario: Download successfully
        When I click the download button
        Then the file should be downloaded successfully

    Scenario: Upload successfully
        When I upload a file
        Then the file should be uploaded successfully
