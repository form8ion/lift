Feature: Base Functionality

  Scenario: Blank Documentation
    Given the existing README has no section heading
    And the existing README has no badges
    And the existing README uses modern badge zones
    And the chosen sub-scaffolder produces badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges from the scaffolder are added to the README

  Scenario: Existing Badges
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses modern badge zones
    And the chosen sub-scaffolder produces badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges from the scaffolder are added to the README

  Scenario: No Badges Produced
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses modern badge zones
    And the chosen sub-scaffolder does not produce badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges remain as they were in the README

  Scenario: Legacy Badge Section Markers With No Badges
    Given the existing README has no section heading
    And the existing README has no badges
    And the existing README uses legacy badge section markers
    And the chosen sub-scaffolder produces badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges from the scaffolder are added to the README

  Scenario: Legacy Badge Section Markers With Existing Badges
    Given the existing README has no section heading
    And the existing README has existing badges
    And the existing README uses legacy badge section markers
    And the chosen sub-scaffolder produces badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges from the scaffolder are added to the README

  Scenario: Badges produced by enhancers
    Given the existing README has existing badges
    And the existing README uses modern badge zones
    And the enhancers produce badges
    And the repository hosted on "github.com"
    When the project is lifted
    Then the badges from the enhancers are added to the README
