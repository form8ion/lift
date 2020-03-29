Feature: Base Functionality

  @wip
  Scenario: Blank Documentation
    Given the existing README has no section heading
    And the existing README has no badges
    When the project is lifted
    Then the badges from the scaffolder are added to the README
