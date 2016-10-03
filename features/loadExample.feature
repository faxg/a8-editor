Feature: Load the A8 bookstore example recipe

  As a devOps engineer
  I want to load the recipe artifacts for the "bookstore" example
  So I can see the JSON source and visualization

  Scenario: Load example bookstore artifacts
    When I open "http://localhost:3000"
    And I click the button "Load template..."
    And I click on "Topology"
    Then I can see the source editor for "Topology" within 1 seconds
# AND ... see the visualization, check json text 