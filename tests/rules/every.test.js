import { RuleTester } from '../utils';

const tester = new RuleTester({ 'every': 'integer' });

suite('Rules: every');

test('Positive: valid input', function () {
    tester.positive([ 1 ], [ 1 ]);
    tester.positive([ 0, 1, 5 - 3874 ], [ 0, 1, 5 - 3874 ]);
});

test('Positive: cast by inner rule', function () {
    tester.positive([ '5' ], [ 5 ]);
    tester.positive([ 10, '-34', -2 ], [ 10, -34, -2 ]);
});

test('Negative: breaks at inner rule', function () {
    const nonumberMsg = 'NOT_NUMBER: The value is not a number or could not be cast to a number';

    tester.negative([ Number.NaN ],  { 0: nonumberMsg });
    tester.negative([ 2, 0.5, '3', 'ssss' ], { 1: 'NOT_INTEGER: The number is not a valid integer', 3: nonumberMsg });
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_ARRAY', 'The value have to be plain js array');
    tester.negative(false, 'NOT_ARRAY', 'The value have to be plain js array');
    tester.negative(true, 'NOT_ARRAY', 'The value have to be plain js array');
    tester.negative('fkdsfdsfkds', 'NOT_ARRAY', 'The value have to be plain js array');
});
