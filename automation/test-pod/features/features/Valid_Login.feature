Feature: Login with success
  As a library's agent
  I want be able to log into the system, using valid credentials

  @ValidLogin @Automated
  Scenario: Login with valid credentials
    Given user is in "Library Login" page
    When user tries to log in with "agent1" and "pass1"
    Then user is logged in to "Library System"
    And "Library List" page is displayed
