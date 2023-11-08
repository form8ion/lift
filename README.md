# lift

tool for running sub-scaffolders on existing projects :aerial_tramway:

<!--status-badges start -->

[![Node CI Workflow Status][github-actions-ci-badge]][github-actions-ci-link]
[![Codecov][coverage-badge]][coverage-link]
[![OpenSSF Scorecard][ossfScorecard-badge]][ossfScorecard-link]
![SLSA Level 2][slsa-badge]

<!--status-badges end -->

## Table of Contents

* [Features](#features)
* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
    * [Import](#import)
    * [Execute](#execute)
  * [API](#api)
    * [`scaffolders` __object__ (_required_)](#scaffolders-object-required)
    * [`decisions` __object__ (_optional_)](#decisions-object-optional)
    * [`enhancers` __object__ (_optional_)](#enhancers-object-optional)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Features

* Runs registered sub-scaffolders independantly of the [project-scaffolder](https://github.com/travi/project-scaffolder),
  enabling existing projects to be lifted with additional functionality
  * Injects badges from the sub-scaffolder results into the `README.md` as long
    as the existing `README.md` lists the badges using the (fairly recent)
    zoning convention
* Modify existing `README.md` files to add badges
* Apply lift enhancers for additional project-specific updates

## Usage

<!--consumer-badges start -->

[![npm][npm-badge]][npm-link]
[![Try @form8ion/lift on RunKit][runkit-badge]][runkit-link]
[![MIT license][license-badge]][license-link]
![node][node-badge]

<!--consumer-badges end -->

### Installation

```sh
$ npm install @form8ion/lift --save-prod
```

### Example

#### Import

```javascript
import {lift, questionNames} from '@form8ion/lift';
```

#### Execute

```javascript
(async () => {
  await lift({scaffolders: {}, decisions: {[questionNames.SCAFFOLDER]: 'foo'}, enhancers: {}});
})();
```

### API

#### `scaffolders` __object__ (_required_)

* keys: __string__ Name of each scaffolder
* values: __function__ Does the scaffolding when executed
  * receives an options object as the first argument
    * `projectRoot`: __string__ path of the working directory where the CLI
      command was executed
    * `vcs`: __object__ details of the exisitng vcs and host
      * `owner`: __string__ owner of the vcs host account
      * `name`: __string__ name of the repository on the host

#### `decisions` __object__ (_optional_)

Answers for expected prompts, to enable consistent behavior while skipping
those particular interactive prompts

* keys: __string__ Name of each question
* values: __mixed__ The answer to provide instead of being prompted
  interactively

#### `enhancers` __object__ (_optional_)

Additional lift processors to be applied to projects based on the result of
applying the provided predicate function to the current project

* keys: __string__ Name of each enhancer. Provided only for developer
  experience. Does not influence execution behavior.
* values: __function__ Does the additional lifting when executed
  * receives an options object as the first argument
    * `projectRoot`: __string__ path of the working directory where the CLI
      command was executed
    * `results`: __object__ results returned from executing the chosen
      sub-scaffolder
    * `vcs`: __object__ details of the exisitng vcs and host
      * `owner`: __string__ owner of the vcs host account
      * `name`: __string__ name of the repository on the host

## Contributing

<!--contribution-badges start -->

[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![PRs Welcome][PRs-badge]][PRs-link]
[![Renovate][renovate-badge]][renovate-link]

<!--contribution-badges end -->

### Dependencies

```sh
$ nvm install
$ npm install
```

### Verification

```sh
$ npm test
```

[npm-link]: https://www.npmjs.com/package/@form8ion/lift

[npm-badge]: https://img.shields.io/npm/v/@form8ion/lift?logo=npm

[runkit-link]: https://npm.runkit.com/@form8ion/lift

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/lift.svg

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/lift.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg

[github-actions-ci-link]: https://github.com/form8ion/lift/actions?query=workflow%3A%22Node.js+CI%22+branch%3Amaster

[github-actions-ci-badge]: https://github.com/form8ion/lift/workflows/Node.js%20CI/badge.svg

[coverage-link]: https://codecov.io/github/form8ion/lift

[coverage-badge]: https://img.shields.io/codecov/c/github/form8ion/lift?logo=codecov

[node-badge]: https://img.shields.io/node/v/@form8ion/lift?logo=node.js

[ossfScorecard-link]: https://securityscorecards.dev/viewer/?uri=github.com/form8ion/lift

[ossfScorecard-badge]: https://api.securityscorecards.dev/projects/github.com/form8ion/lift/badge

[slsa-badge]: https://slsa.dev/images/gh-badge-level2.svg

[renovate-link]: https://renovatebot.com

[renovate-badge]: https://img.shields.io/badge/renovate-enabled-brightgreen.svg?logo=renovatebot
