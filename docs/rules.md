# Validation Rules

## attributes

Checks object properties.

**Errors**:

*   [`NOT_OBJECT`](../errors#NOT_OBJECT)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/attributes.js#L12)

## boolean

Checks input to be a boolean-like primitive.

**Errors**:

*   [`NOT_BOOLEAN`](../errors#NOT_BOOLEAN)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/boolean.js#L13)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/boolean.test.js)

**Examples**

boolean *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("boolean");

validator.validate(true) //true
validator.validate(false) //false

```

string *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("boolean");

validator.validate('true') //true
validator.validate('false') //false

```

number *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("boolean");

validator.validate(1) //true
validator.validate(0) //false

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("boolean");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## cron

Checks string to be valid a cron string.

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`INVALID_CRON`](../errors#INVALID_CRON)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/cron.js#L63)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/cron.test.js)

**Examples**

cron *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("cron");

validator.validate('0 4 8-14 * *') //'0 4 8-14 * *'
validator.validate('0 0 1,15 * 3') //'0 0 1,15 * 3'
validator.validate('5 0 * 8 *') //'5 0 * 8 *'
validator.validate('23 0-20/2 * * *') //'23 0-20/2 * * *'
validator.validate('5-10 4 */3 * sun') //'5-10 4 */3 * sun'
validator.validate('0 0,5-12 1 */2 *') //'0 0,5-12 1 */2 *'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("cron");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## base64

Checks input to be a valid base64 string.

**Specification**: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`NOT_BASE64`](../errors#NOT_BASE64)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/base64.js#L14)

## default

Set default value.

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/default.js#L10)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/default.test.js)

**Examples**

set default value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"default":100});

validator.validate(null) //100
validator.validate(undefined) //100

```

skip if value is already set *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"default":100});

validator.validate(false) //false
validator.validate(NaN) //NaN
validator.validate(0) //0
validator.validate('') //''

```

## email

Checks input to be a valid email address.

**Specification**: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`WRONG_EMAIL`](../errors#WRONG_EMAIL)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/email.js#L43)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/email.test.js)

**Examples**

email *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("email");

validator.validate('mo@soto.pr') //'mo@soto.pr'
validator.validate('qwe+caf_=4evnlldiziyrfbozh7wgx5k3x=ololo.domain.com@test.com') //'qwe+caf_=4evnlldiziyrfbozh7wgx5k3x=ololo.domain.com@test.com'
validator.validate('"dasdsd@dkslfksd"@kfdfkds.dlkfdf') //'"dasdsd@dkslfksd"@kfdfkds.dlkfdf'
validator.validate('is+1@uzehuh.ky') //'is+1@uzehuh.ky'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("email");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## encryption_key

Checks input to be a valid encryption key.

**Alias**: `encryptionKey`

**Note!** The [`string`](#string) and [`base64`](#base64) rules are checked before running validation.

**Errors**:

*   [`BAD_ENCRYPTION_HEADER`](../errors#BAD_ENCRYPTION_HEADER)
*   [`BAD_ENCRYPTION_FOOTER`](../errors#BAD_ENCRYPTION_FOOTER)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/encryptionKey.js#L20)

## enum

Checks value to be one of possible options.

**Errors**:

*   [`NOT_ALLOWED_VALUE`](../errors#NOT_ALLOWED_VALUE)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/enum.js#L11)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/enum.test.js)

**Examples**

enum *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"enum":[false,1,"a"]});

validator.validate('a') //'a'
validator.validate(1) //1
validator.validate(false) //false

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"enum":[false,1,"a"]});

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## every

Validate array items.

**Errors**:

*   [`NOT_ARRAY`](../errors#NOT_ARRAY)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/every.js#L12)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/every.test.js)

**Examples**

valid input *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"every":"integer"});

validator.validate([ 1 ]) //[ 1 ]
validator.validate([ 0, 1, -3869 ]) //[ 0, 1, -3869 ]

```

cast by inner rule *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"every":"integer"});

validator.validate([ '5' ]) //[ 5 ]
validator.validate([ 10, '-34', -2 ]) //[ 10, -34, -2 ]

```

## integer

Checks value to be an integer.

**Note!** The [`number`](#number) rule is checked before running validation.

**Errors**:

*   [`NOT_INTEGER`](../errors#NOT_INTEGER)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/integer.js#L12)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/integer.test.js)

**Examples**

numbers *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("integer");

validator.validate(1) //1
validator.validate(-3874) //-3874
validator.validate(0) //0
validator.validate(10000000) //10000000

```

string *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("integer");

validator.validate('5') //5
validator.validate('6.0') //6
validator.validate('-34') //-34

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("integer");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## max

Checks value to be less than threshold.

**Errors**:

*   [`TOO_HIGH`](../errors#TOO_HIGH)
*   [`TOO_LONG`](../errors#TOO_LONG)
*   [`WRONG_FORMAT`](../errors#WRONG_FORMAT)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/max.js#L18)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/max.test.js)

**Examples**

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"max":5});

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## min

Checks value to be more than threshold.

**Errors**:

*   [`TOO_LOW`](../errors#TOO_LOW)
*   [`TOO_SHORT`](../errors#TOO_SHORT)
*   [`WRONG_FORMAT`](../errors#WRONG_FORMAT)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/min.js#L18)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/min.test.js)

**Examples**

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({"min":5});

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## number

Checks value to be a number (or number-like string).

**Errors**:

*   [`NOT_NUMBER`](../errors#NOT_NUMBER)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/number.js#L11)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/number.test.js)

**Examples**

numbers *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("number");

validator.validate(1) //1
validator.validate(-3874) //-3874
validator.validate(0) //0
validator.validate(10000000) //10000000

```

string *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("number");

validator.validate('5') //5
validator.validate('6.0') //6
validator.validate('-34') //-34

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("number");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## or

Checks value to match one of following rules. throws last failed rule, if none matched.

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/or.js#L10)

## port

Checks value to be a valid port number.

**Note!** The [`integer`](#integer) rule is checked before running validation.

**Errors**:

*   [`NOT_NUMBER`](../errors#NOT_NUMBER)
*   [`WRONG_PORT_NUMBER`](../errors#WRONG_PORT_NUMBER)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/port.js#L12)

## required

Checks value is present.

**Errors**:

*   [`REQUIRED`](../errors#REQUIRED)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/required.js#L10)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/required.test.js)

**Examples**

numbers *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("required");

validator.validate(1) //1
validator.validate(NaN) //NaN
validator.validate(0) //0

```

## string

Checks value to be a string.

**Errors**:

*   [`NOT_STRING`](../errors#NOT_STRING)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/string.js#L10)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/string.test.js)

**Examples**

string *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("string");

validator.validate('5') //'5'
validator.validate('odsozci@jiswupre.co.uk') //'odsozci@jiswupre.co.uk'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("string");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## time_unit

Checks value to be a time unit.

**Alias**: `timeUnit`

**Note!** The [`number`](#number) rule is checked before running validation.

**Errors**:

*   [`WRONG_TIME_UNIT`](../errors#WRONG_TIME_UNIT)
*   [`WRONG_FORMAT`](../errors#WRONG_FORMAT)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/timeUnit.js#L95)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/timeUnit.test.js)

**Examples**

time_unit *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("time_unit");

validator.validate('1s') //1000
validator.validate(' -1000') //-1000
validator.validate(0) //0
validator.validate(' -2 hours ') //-7200000

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("time_unit");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## uuid

Checks value to be a uuid v4.

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`NOT_UUID`](../errors#NOT_UUID)

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/uuid.js#L23)

[Tests](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/tests/rules/uuid.test.js)

**Examples**

uuid *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("uuid");

validator.validate('b69f3671-01eb-4802-88f5-0bf567a9522c') //'b69f3671-01eb-4802-88f5-0bf567a9522c'
validator.validate('497680db-4963-488f-82ee-3ec0e734a7b6') //'497680db-4963-488f-82ee-3ec0e734a7b6'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile("uuid");

validator.validate(null) //null
validator.validate(undefined) //undefined

```

## to_lowercase

Transforms value to lowercase.

**Alias**: `to_lower`

**Note!** The [`string`](#string) rule is checked before running validation.

[Source](https://github.com/pustovitDmytro/cottus/blob/0f714b1ccaedc6f05deb6bcba9133df495285863/src/rules/toLower.js#L10)
