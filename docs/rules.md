# Validation Rules

## boolean

Checks input to be a boolean-like primitive.

**Errors**:

*   [`NOT_BOOLEAN`](../errors#NOT_BOOLEAN)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/boolean.js#L13)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/boolean.test.js)

**Examples**

boolean *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('boolean');

validator.validate(true); // true
validator.validate(false); // false

```

string *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('boolean');

validator.validate('true'); // true
validator.validate('false'); // false

```

number *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('boolean');

validator.validate(1); // true
validator.validate(0); // false

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('boolean');

validator.validate(null); // null
validator.validate(); // undefined

```

## cron

Checks string to be valid a cron string.

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`INVALID_CRON`](../errors#INVALID_CRON)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/cron.js#L63)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/cron.test.js)

**Examples**

cron *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('cron');

validator.validate('0 4 8-14 * *'); // '0 4 8-14 * *'
validator.validate('0 0 1,15 * 3'); // '0 0 1,15 * 3'
validator.validate('5 0 * 8 *'); // '5 0 * 8 *'
validator.validate('23 0-20/2 * * *'); // '23 0-20/2 * * *'
validator.validate('5-10 4 */3 * sun'); // '5-10 4 */3 * sun'
validator.validate('0 0,5-12 1 */2 *'); // '0 0,5-12 1 */2 *'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('cron');

validator.validate(null); // null
validator.validate(); // undefined

```

## default

Set default value.

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/default.js#L10)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/default.test.js)

**Examples**

set default value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'default': 100 });

validator.validate(null); // 100
validator.validate(); // 100

```

skip if value is already set *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'default': 100 });

validator.validate(false); // false
validator.validate(Number.NaN); // NaN
validator.validate(0); // 0
validator.validate(''); // ''

```

## base64

Checks input to be a valid base64 string.

**Specification**: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`NOT_BASE64`](../errors#NOT_BASE64)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/base64.js#L14)

## email

Checks input to be a valid email address.

**Specification**: https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1

**Note!** The [`string`](#string) rule is checked before running validation.

**Errors**:

*   [`WRONG_EMAIL`](../errors#WRONG_EMAIL)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/email.js#L43)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/email.test.js)

**Examples**

email *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('email');

validator.validate('mo@soto.pr'); // 'mo@soto.pr'
validator.validate('qwe+caf_=4evnlldiziyrfbozh7wgx5k3x=ololo.domain.com@test.com'); // 'qwe+caf_=4evnlldiziyrfbozh7wgx5k3x=ololo.domain.com@test.com'
validator.validate('"dasdsd@dkslfksd"@kfdfkds.dlkfdf'); // '"dasdsd@dkslfksd"@kfdfkds.dlkfdf'
validator.validate('is+1@uzehuh.ky'); // 'is+1@uzehuh.ky'

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile('email');

validator.validate(null); // null
validator.validate(); // undefined

```

## encryption_key

Checks input to be a valid encryption key.

**Alias**: `encryptionKey`

**Note!** The [`string`](#string) and [`base64`](#base64) rules are checked before running validation.

**Errors**:

*   [`BAD_ENCRYPTION_HEADER`](../errors#BAD_ENCRYPTION_HEADER)
*   [`BAD_ENCRYPTION_FOOTER`](../errors#BAD_ENCRYPTION_FOOTER)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/encryptionKey.js#L20)

## attributes

Checks object properties.

**Errors**:

*   [`NOT_OBJECT`](../errors#NOT_OBJECT)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/attributes.js#L12)

## enum

Checks value to be one of possible options.

**Errors**:

*   [`NOT_ALLOWED_VALUE`](../errors#NOT_ALLOWED_VALUE)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/enum.js#L11)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/enum.test.js)

**Examples**

enum *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'enum': [ false, 1, 'a' ] });

validator.validate('a'); // 'a'
validator.validate(1); // 1
validator.validate(false); // false

```

empty value *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'enum': [ false, 1, 'a' ] });

validator.validate(null); // null
validator.validate(); // undefined

```

## every

Validate array items.

**Errors**:

*   [`NOT_ARRAY`](../errors#NOT_ARRAY)

[Source](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702/src/rules/every.js#L12)

[Tests](https://github.com/pustovitDmytro/cottus.git/blob/e46e3aaf83920d83050ed754433237e394738702//home/dima/Projects/pet/cottus/tests/rules/every.test.js)

**Examples**

valid input *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'every': 'integer' });

validator.validate([ 1 ]); // [ 1 ]
validator.validate([ 0, 1, -3869 ]); // [ 0, 1, -3869 ]

```

cast by inner rule *(positive)*

```javascript
import cottus from 'cottus';

const validator = cottus.compile({ 'every': 'integer' });

validator.validate([ '5' ]); // [ 5 ]
validator.validate([ 10, '-34', -2 ]); // [ 10, -34, -2 ]

```
