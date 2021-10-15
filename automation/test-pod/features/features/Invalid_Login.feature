Feature: Invalid Login
  As a library's agent
  I want to be able to try to login with invalid credentials and receive a error message

  @InvalidLogin @Automated
  Scenario: Login with invalid credentials
    Given user is in "Library Login" page
    When user tries to log in with "agent2" and "pass1"
    Then "Library Login" page is displayed
	And "Invalid username or password" message is displayed