Feature: Graphical visualization of service dependencies

  As a devOps engineer
  I want to see a visualization of my "Topology" JSON document
  So that I get a direct overview over all service dependencies

  Scenario: Get visualization for example documents
    When I open "http://localhost:7000"
    And I click the button "Load template..."
    And I click on "Topology"
    Then I can see the source editor for "Topology" within 1 seconds
    And I see a "dependency" visualization within 2 seconds