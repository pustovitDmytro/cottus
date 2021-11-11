import { RuleTester } from '../utils';

const tester = new RuleTester({ 'enum': [ false, 1, 'a' ] });

suite('Rules: enum');

test('Positive: enum', function () {
    tester.positive('a', 'a');
    tester.positive(1, 1);
    tester.positive(false, false);
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative(4, 'NOT_ALLOWED_VALUE', 'The value is not allowed');
    tester.negative(true, 'NOT_ALLOWED_VALUE', 'The value is not allowed');
    tester.negative([ 'fkdsfdsfkds' ], 'NOT_ALLOWED_VALUE', 'The value is not allowed');
});
