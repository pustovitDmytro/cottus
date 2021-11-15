# cottus

Customizable JavaScript data validator. 

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Total alerts][lgtm-alerts-badge]][lgtm-alerts-url]
[![Language grade][lgtm-lg-badge]][lgtm-lg-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]

## Table of Contents
  - [Features](#features)
  - [Motivation](#motivation)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
  - [Contribute](#contribute)

## Features
- [x] Free of complex regexes
- [x] All schemas described as serializable objects
- [x] Easy to extend with own rules
- [x] Supports complex hierarchical structures

Coming soon:
- [ ] References. [issue #11][i11]
- [ ] Async rules support. [issue #13][i13]

## Motivation

There are several nice validators in the JS world ([livr][npm-livr], [joi][npm-joi]), but no one satisfied all my needs entirely. 

Another big question here is why not just use [regular expressions][RegExp]? Regexp is an undoubtedly powerful tool, but has its own cons. I am completely tired of searching for valid regexp for any standard validation task. Most of them need almost [scientific paper][regexp-email] to describe patterns. They are totally unpredictable when faced with arbitrary inputs, hard to maintain, debug and explain.

So, that is another JS validator, describing my view for the modern validation process. 

## Requirements
[![Platform Status][appveyor-badge]][appveyor-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][appveyor-url] on darwin, linux, win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

## Installation

To install the library run the following command

```bash
  npm i --save cottus
```

## Usage

Commonly usage is a two steps process:
  1. Constructing validator from a schema
  2. Running validator on arbitrary input.

```javascript
import cottus from 'cottus';

const validator = cottus.compile([
    'required', { 'attributes' : {
        'id'       : [ 'required', 'uuid' ],
        'name'     : [ 'string', { 'min': 3 }, { 'max': 256 } ],
        'email'    : [ 'required', 'email' ],
        'contacts' : [ { 'every' : {
            'attributes' : {
                'type' : [
                    'required',
                    { 'enum': [ 'phone', 'facebook' ] }
                ],
                'value' : [ 'required', 'string' ]
            }
        } } ]
    } }
]);

try {
    const valid = validator.validate(rawUserData);

    console.log('Data is valid:', valid);
} catch (error) {
    console.error('Validation Failed:', error);
}

```

### Errors
`CottusValidationError` would be returned in case of validation failure.

There are 2 ways of identifying this error: 

1. **recommended**: verify the affiliation to the class:
   
  ```javascript
  import { ValidationError } from 'cottus';
  
  if (error instanceof ValidationError) {
      console.error(error.prettify);
  }
  ``` 
2. *soft way*: check `isValidationError` property:
  
  ```javascript
  try {
      const valid = validator.validate(rawUserData);
  
      console.log('Data is valid:', valid);
  } catch (error) {
      if (error.isValidationError) {
          onsole.error('Validation Failed:', error);
      }
  
      console.error('Unknown error occured:', error);
  }
  ``` 

  To get a pretty hierarchical tree with error codes, use:
  ```javascript
  console.error(error.prettify);
  ```

  To get full error data, use: 
  ```javascript
  console.error(error.hash);
  ```

## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/cottus
[github]: https://github.com/pustovitDmytro/cottus
[coveralls]: https://coveralls.io/github/pustovitDmytro/cottus?branch=master
[badge-deps]: https://img.shields.io/david/pustovitDmytro/cottus.svg
[badge-vers]: https://img.shields.io/npm/v/cottus.svg
[badge-lic]: https://img.shields.io/github/license/pustovitDmytro/cottus.svg
[badge-coverage]: https://coveralls.io/repos/github/pustovitDmytro/cottus/badge.svg?branch=master
[url-coverage]: https://coveralls.io/github/pustovitDmytro/cottus?branch=master

[snyk-badge]: https://snyk-widget.herokuapp.com/badge/npm/cottus/badge.svg
[snyk-url]: https://snyk.io/advisor/npm-package/cottus

[tests-badge]: https://img.shields.io/circleci/build/github/pustovitDmytro/cottus
[tests-url]: https://app.circleci.com/pipelines/github/pustovitDmytro/cottus

[codefactor-badge]: https://www.codefactor.io/repository/github/pustovitdmytro/cottus/badge
[codefactor-url]: https://www.codefactor.io/repository/github/pustovitdmytro/cottus

[commit-activity-badge]: https://img.shields.io/github/commit-activity/m/pustovitDmytro/cottus

[scrutinizer-badge]: https://scrutinizer-ci.com/g/pustovitDmytro/cottus/badges/quality-score.png?b=master
[scrutinizer-url]: https://scrutinizer-ci.com/g/pustovitDmytro/cottus/?branch=master

[lgtm-lg-badge]: https://img.shields.io/lgtm/grade/javascript/g/pustovitDmytro/cottus.svg?logo=lgtm&logoWidth=18
[lgtm-lg-url]: https://lgtm.com/projects/g/pustovitDmytro/cottus/context:javascript

[lgtm-alerts-badge]: https://img.shields.io/lgtm/alerts/g/pustovitDmytro/cottus.svg?logo=lgtm&logoWidth=18
[lgtm-alerts-url]: https://lgtm.com/projects/g/pustovitDmytro/cottus/alerts/

[codacy-badge]: https://app.codacy.com/project/badge/Grade/9ca51e1503df488f92393737a3be2271
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/cottus/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/cottus&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_cottus&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_cottus

[npm-downloads-badge]: https://img.shields.io/npm/dw/cottus
[npm-size-badge]: https://img.shields.io/bundlephobia/min/cottus
[npm-size-url]: https://bundlephobia.com/result?p=cottus

[appveyor-badge]: https://ci.appveyor.com/api/projects/status/lik73h3vxd7687pr/branch/master?svg=true
[appveyor-url]: https://ci.appveyor.com/project/pustovitDmytro/cottus/branch/master

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fcottus.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fcottus?ref=badge_shield

[i11]: https://github.com/user/repo/issues/11
[i13]: https://github.com/user/repo/issues/13

[npm-joi]: https://www.npmjs.com/package/joi
[npm-livr]: https://www.npmjs.com/package/livr
[regexp-email]: https://www.regular-expressions.info/email.html

[RegExp]: https://en.wikipedia.org/wiki/Regular_expression