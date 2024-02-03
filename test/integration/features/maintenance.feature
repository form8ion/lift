Feature: General Maintenance

  Scenario: maintenance of repository hosted on github.com
    Given only general maintenance should be performed
    And the repository hosted on "github.com"
    When the project is lifted
    Then vcs details are provided to the enhancers

  Scenario: maintenance of repository hosted on a self-hosted service
    Given only general maintenance should be performed
    And the repository hosted on "self.hosted.com"
    When the project is lifted
    Then vcs details are provided to the enhancers
