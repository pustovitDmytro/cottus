import { RuleTester } from '../utils';

const tester = new RuleTester('integer');

suite('Rules: integer');

test('Positive: numbers', function () {
    tester.positive(1, 1);
    tester.positive(-3874, -3874);
    tester.positive(0, 0);
    tester.positive(1e+7, 1e+7);
});

test('Positive: string', function () {
    tester.positive('5', 5);
    tester.positive('6.0', 6);
    tester.positive('-34', -34);
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: numbers', function () {
    tester.negative(Number.NaN, 'NOT_NUMBER', 'The value is not a number or could not be cast to a number');
    tester.negative(0.5, 'NOT_INTEGER', 'The number is not a valid integer');
    tester.negative(-432.9, 'NOT_INTEGER', 'The number is not a valid integer');
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_NUMBER', 'The value is not a number or could not be cast to a number');
    tester.negative(false, 'NOT_NUMBER', 'The value is not a number or could not be cast to a number');
    tester.negative(true, 'NOT_NUMBER', 'The value is not a number or could not be cast to a number');
    tester.negative('fkdsfdsfkds', 'NOT_NUMBER', 'The value is not a number or could not be cast to a number');
});
