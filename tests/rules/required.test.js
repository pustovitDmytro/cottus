import { RuleTester } from '../utils';

const tester = new RuleTester('required');

suite('Rules: required');

test('Positive: numbers', function () {
    tester.positive(1, 1);
    tester.positive(Number.NaN, Number.NaN);
    tester.positive(0, 0);
});

test('Negative: REQUIRED', function () {
    tester.negative(undefined, 'REQUIRED', 'The value is required');
    tester.negative(null, 'REQUIRED', 'The value is required');
});
