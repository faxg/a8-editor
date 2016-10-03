Feature: Load the home page

  As an DevOps Engineer
  I want to open the web-based user interface
  So I can start using the A8 Editor

  Scenario: Find "Scenarios" in navigation menu
    When I open "http://localhost:3000/"
    Then there is a navigation menu item for "Scenarios"


  Scenario: Open the "General" tab in Scenario view and make sure we can enter a recipe name (which then gets sanitized) and some short description 
    When I open "http://localhost:3000/"
    And I click on "Scenarios"
    And I click on "General"
    Then I can set the input text for "Recipe Name" to "Automated Test Recipe !"
    And I can set the input text for "Short description" to "This is some automatic test"
    Then I find the text "automatedTestRecipe" on the page