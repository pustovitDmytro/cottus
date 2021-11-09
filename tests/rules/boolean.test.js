import { RuleTester } from '../utils';

const tester = new RuleTester('boolean');

suite('Rules: boolean');

test('Positive: boolean', function () {
    tester.positive(true, true);
    tester.positive(false, false);
});

test('Positive: string', function () {
    tester.positive('true', true);
    tester.positive('false', false);
});

test('Positive: number', function () {
    tester.positive(1, true);
    tester.positive(0, false);
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_BOOLEAN', 'The value is not a boolean or could not be cast to a boolean');
    tester.negative('fkdsfdsfkds', 'NOT_BOOLEAN', 'The value is not a boolean or could not be cast to a boolean');
    tester.negative(2, 'NOT_BOOLEAN', 'The value is not a boolean or could not be cast to a boolean');
});
