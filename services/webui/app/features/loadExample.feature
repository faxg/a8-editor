Feature: Load the A8 bookstore example recipe

  As a devOps engineer
  I want to load the recipe artifacts for testing the "bookstore" example
  So I can see the JSON source and visualization

  Scenario: Load example bookstore artifacts and expect dependency visualization
    Given I have navigated to "Scenarios"
    When I click "Load template..."
    Then I see the source code within 1 seconds
    And I see the dependency visualization within 2 seconds