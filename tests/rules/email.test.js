import { RuleTester } from '../utils';

const tester = new RuleTester('email');

suite('Rules: email');

const valid = [
    'mo@soto.pr',
    // eslint-disable-next-line no-secrets/no-secrets
    'qwe+caf_=4evnlldiziyrfbozh7wgx5k3x=ololo.domain.com@test.com',
    '"dasdsd@dkslfksd"@kfdfkds.dlkfdf',
    'is+1@uzehuh.ky'
];

test('Positive: email', function () {
    for (const email of valid) {
        tester.positive(email, email);
    }
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});


const invalid = [
    '.pelzi@ni.eh',
    'zidalbak@pabwi[zi].hk',
    'cowo"@ibaceti.re',
    's[obekzel@golehu.rs'
    // 'he@baniwi.tt'
];

test('Negative: bad formats', function () {
    tester.negative(true, 'NOT_STRING', 'The value is not a string');
    tester.negative([ 'abimem@fe.bh' ], 'NOT_STRING', 'The value is not a string');

    for (const email of invalid) {
        tester.negative(email, 'WRONG_EMAIL', 'The value is not a valid rfc5322 email format');
    }
});
