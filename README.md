![Logo](docs/logo_250.png "cottus")
# cottus

Customizable JavaScript data validator. 

[![Version][badge-vers]][npm]
[![Bundle size][npm-size-badge]][npm-size-url]
[![Downloads][npm-downloads-badge]][npm]

[![CodeFactor][codefactor-badge]][codefactor-url]
[![SonarCloud][sonarcloud-badge]][sonarcloud-url]
[![Codacy][codacy-badge]][codacy-url]
[![Scrutinizer][scrutinizer-badge]][scrutinizer-url]

[![Dependencies][badge-deps]][npm]
[![Security][snyk-badge]][snyk-url]
[![Build Status][tests-badge]][tests-url]
[![Coverage Status][badge-coverage]][url-coverage]

[![Commit activity][commit-activity-badge]][github]
[![FOSSA][fossa-badge]][fossa-url]
[![License][badge-lic]][github]
[![Made in Ukraine][ukr-badge]][ukr-link]

## 🇺🇦 Help Ukraine
I woke up on my 26th birthday at 5 am from the blows of russian missiles. They attacked the city of Kyiv, where I live, as well as the cities in which my family and friends live. Now my country is a war zone. 

We fight for democratic values, freedom, for our future! Once again Ukrainians have to stand against evil, terror, against genocide. The outcome of this war will determine what path human history is taking from now on.

💛💙  Help Ukraine! We need your support! There are [dozen ways][ukr-link] to help us, just do it!

## Table of Contents
- [cottus](#cottus)
  - [🇺🇦 Help Ukraine](#-help-ukraine)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Motivation](#motivation)
  - [Requirements](#requirements)
  - [Installation](#installation)
  - [Usage](#usage)
    - [Errors](#errors)
    - [Assembler](#assembler)
    - [Custom rules](#custom-rules)
  - [Implementations](#implementations)
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
[![Platform Status][node-ver-test-badge]][node-ver-test-url]

To use library you need to have [node](https://nodejs.org) and [npm](https://www.npmjs.com) installed in your machine:

* node `>=10`
* npm `>=6`

Package is [continuously tested][node-ver-test-url] on darwin, linux, win32 platforms. All active and maintenance [LTS](https://nodejs.org/en/about/releases/) node releases are supported.

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

Check list of available rules at [reference][reference]

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
          console.error('Validation Failed:', error);
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

### Assembler
if you need to gather a flat list of values into the hierarchy and validate, use the **Assembler** module. 

Typical use case - transforming environment variables into the config:

 ```javascript
import { Assembler } from 'cottus';

const assembler = new Assembler(cottus, schema);
const e = process.env;

const schema = {
     mongo : !!e.MONGO_CONNECTION_STRING ? {
         url : { $source: '{MONGO_CONNECTION_STRING}', $validate: [ 'required', 'url' ] },
         db  : { $source: '{MONGO_DB_NAME}', $validate: [ 'required', 'string' ] }
     } : null,
     redis : {
         port     : { $source: '{REDIS_PORT}', $validate: [ 'required', 'port' ] },
         host     : { $source: '{REDIS_HOST}', $validate: [ 'required', 'hostname' ] },
         db       : { $source: '{REDIS_DB}', $validate: [ 'integer' ] },
         password : { $source: '{REDIS_PASSWORD}', $validate: [ 'string' ] },
         username : { $source: '{REDIS_USER}', $validate: [ 'string' ] }
     },
     'administrators' : {
         $source   : { type: 'complex_array', prefix: 'ADMIN_' },
         $validate : {
             'login'     : { $source: '{_LOGIN}', $validate: [ 'required', 'email' ] },
             'password'  : { $source: '{_PASSWORD}', $validate: [ 'string' ] },
             permissions : {
                 $source   : { type: 'simple_array', prefix: '_PERMISSIONS_' },
                 $validate : { 'enum': [ 'read', 'write' ] }
             }
         }
     }
};

assembler.parse();
const config = assembler.run(process.env);
```

`schema` should be a hierarchical object. The deepest properties can be one of the following keywords:
 - `$source`: can be a placeholder `'{REDIS_PORT}'` or an object: `{ type: 'complex_array', prefix: 'USER_' }`. Next types allowed:
    * `complex_array`: array of objects
    * `simple_array`: array of primitives
    * `constant`: a value
 - `$validate`: cottus schema.

To check more examples, see [implementation](#implementations) section.
### Custom rules

cottus can be extended with new rules.

```javascript
import cottus, { BaseRule } from 'cottus';

class Split extends BaseRule {
    static schema = 'split';

    validate(input) {
        const symbol = this.params;

        return input.split(symbol);
    }
}

cottus.addRules([
    Split
]);

```
now rule `split` can be used in cottus schema:

```javascript
const validator = cottus.compile([
    'required',
    { 'split': ' ' },
    { every: 'email' }
]);

const admins = validator.validate('sig@viwjirgo.bn neho@sorcopaz.ml ta@inepad.ax');

console.log(admins);
// ['sig@viwjirgo.bn', 'neho@sorcopaz.ml', 'ta@inepad.ax']
```

to throw validation error from the custom rule, use predefined errors:

```javascript
import { errors } from 'cottus';

const { NOT_ALLOWED_VALUE } = errors;

if (!valid) throw new NOT_ALLOWED_VALUE();
```

or create own error:
```javascript
import { BaseError } from 'cottus';

class UnsafeNumberError extends BaseError {
    message = 'The number is not within the safe range of JavaScript numbers';
    code = 'UNSAFE_NUMBER';
}
```

## Implementations

Are you looking for more examples?

**Validation**
 * [ianus](https://github.com/pustovitDmytro/ianus/blob/master/src/lists)
 * [ianus](https://github.com/pustovitDmytro/ianus/blob/master/src/etc/config.js)
 * [semantic-release-telegram](https://github.com/pustovitDmytro/semantic-release-telegram/blob/master/src/verifyConditions.js)
 * [semantic-release-heroku](https://github.com/pustovitDmytro/semantic-release-heroku/blob/master/src/verifyConditions.js)

**Custom rules** 
 * [ianus](https://github.com/pustovitDmytro/ianus/blob/master/src/utils/cottus.js): split string into array

**Assembler**
 * [ianus](https://github.com/pustovitDmytro/ianus/blob/master/src/etc/config.js): transform process.env into config
 * [ianus](https://github.com/pustovitDmytro/ianus/blob/master/src/lists/Loader.js): load data from env or mongo collection.


## Contribute

Make the changes to the code and tests. Then commit to your branch. Be sure to follow the commit message conventions. Read [Contributing Guidelines](.github/CONTRIBUTING.md) for details.

[npm]: https://www.npmjs.com/package/cottus
[github]: https://github.com/pustovitDmytro/cottus
[coveralls]: https://coveralls.io/github/pustovitDmytro/cottus?branch=master
[badge-deps]: https://img.shields.io/librariesio/release/npm/cottus.svg
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

[codacy-badge]: https://app.codacy.com/project/badge/Grade/9ca51e1503df488f92393737a3be2271
[codacy-url]: https://www.codacy.com/gh/pustovitDmytro/cottus/dashboard?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=pustovitDmytro/cottus&amp;utm_campaign=Badge_Grade

[sonarcloud-badge]: https://sonarcloud.io/api/project_badges/measure?project=pustovitDmytro_cottus&metric=alert_status
[sonarcloud-url]: https://sonarcloud.io/dashboard?id=pustovitDmytro_cottus

[npm-downloads-badge]: https://img.shields.io/npm/dw/cottus
[npm-size-badge]: https://img.shields.io/bundlephobia/min/cottus
[npm-size-url]: https://bundlephobia.com/result?p=cottus

[node-ver-test-badge]: https://github.com/pustovitDmytro/cottus/actions/workflows/npt.yml/badge.svg?branch=master
[node-ver-test-url]: https://github.com/pustovitDmytro/cottus/actions?query=workflow%3A%22Node.js+versions%22

[fossa-badge]: https://app.fossa.com/api/projects/custom%2B24828%2Fcottus.svg?type=shield
[fossa-url]: https://app.fossa.com/projects/custom%2B24828%2Fcottus?ref=badge_shield

[ukr-badge]: https://img.shields.io/badge/made_in-ukraine-ffd700.svg?labelColor=0057b7
[ukr-link]: https://war.ukraine.ua

[i11]: https://github.com/user/repo/issues/11
[i13]: https://github.com/user/repo/issues/13

[npm-joi]: https://www.npmjs.com/package/joi
[npm-livr]: https://www.npmjs.com/package/livr
[regexp-email]: https://www.regular-expressions.info/email.html

[RegExp]: https://en.wikipedia.org/wiki/Regular_expression

[reference]: https://pustovitdmytro.github.io/cottus/
