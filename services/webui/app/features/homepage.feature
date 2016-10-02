Feature: Load the home page

  As an DevOps Engineer
  I want to open the start page
  So I can see the A8 Editor


  Scenario: Look at Navigation menu
    Given I have loaded the index page on my Notebok
    When I look at the navigation bar "Amalgam8 Editor"
    Then I find a navigation item for "Scenarios"