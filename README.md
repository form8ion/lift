# lift

tool for running sub-scaffolders on existing projects

<!-- status badges -->

[![Build Status][ci-badge]][ci-link]

## Table of Contents

* [Usage](#usage)
  * [Installation](#installation)
  * [Example](#example)
  * [API](#api)
    * [`scaffolders` __object__ (_required_)](#scaffolders-object-required)
* [Contributing](#contributing)
  * [Dependencies](#dependencies)
  * [Verification](#verification)

## Features

* Runs registered sub-scaffolders independantly of the [project-scaffolder](https://github.com/travi/project-scaffolder),
  enabling existing projects to be lifted with additional functionality

### Coming Soon

* Modification of existing `README.md` files to add badges and other
  documentation
* JavaScript project features
  * Dependency installation
  * Modification of `package.json` to add `scripts` and other details

## Usage

<!-- consumer badges -->

[![npm][npm-badge]][npm-link]
[![Try @form8ion/lift on RunKit][runkit-badge]][runkit-link]
[![MIT license][license-badge]][license-link]

### Installation

```sh
$ npm install @form8ion/lift --save-prod
```

### Example

```javascript
import {lift} from '@form8ion/lift';

lift({});
```

### API

#### `scaffolders` __object__ (_required_)

* keys: __string__ Name of each scaffolder
* values: __function__ Does the scaffolding when executed
  * receives an options object as the first argument
    * `projectRoot`: __string__ path of the working directory where the CLI
      command was executed

#### `decisions` __object__ (_optional_)

Answers for expected prompts, to enable consistent behavior while skipping
those particular interactive prompts

* keys: __string__ Name of each question
* values:

## Contributing

<!-- contribution badges -->

[![Conventional Commits][commit-convention-badge]][commit-convention-link]
[![Commitizen friendly][commitizen-badge]][commitizen-link]
[![semantic-release][semantic-release-badge]][semantic-release-link]
[![PRs Welcome][PRs-badge]][PRs-link]

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

[npm-badge]: https://img.shields.io/npm/v/@form8ion/lift.svg

[runkit-link]: https://npm.runkit.com/@form8ion/lift

[runkit-badge]: https://badge.runkitcdn.com/@form8ion/lift.svg

[license-link]: LICENSE

[license-badge]: https://img.shields.io/github/license/form8ion/lift.svg

[ci-link]: https://travis-ci.com/form8ion/lift

[ci-badge]: https://img.shields.io/travis/com/form8ion/lift/master.svg

[commit-convention-link]: https://conventionalcommits.org

[commit-convention-badge]: https://img.shields.io/badge/Conventional%20Commits-1.0.0-yellow.svg

[commitizen-link]: http://commitizen.github.io/cz-cli/

[commitizen-badge]: https://img.shields.io/badge/commitizen-friendly-brightgreen.svg

[semantic-release-link]: https://github.com/semantic-release/semantic-release

[semantic-release-badge]: https://img.shields.io/badge/%20%20%F0%9F%93%A6%F0%9F%9A%80-semantic--release-e10079.svg

[PRs-link]: http://makeapullrequest.com

[PRs-badge]: https://img.shields.io/badge/PRs-welcome-brightgreen.svg
