Feature: Edit book information
As a library's agent
I want to edit book details

@EditBook @Automated
Scenario: [Integration] Edit book
    Given the book has the following details
    | name   | pageNumbers  |
    | Test1	 | 100			|
    And user is in "Book Details" page
    When user edits the book with the following information
    | name   | pageNumbers  |
    | Test2	 | 101			|
    And user clicks on Save
    Then book is saved
    And the book has the following values
    | name   | pageNumbers  |
    | Test2	 | 101			|