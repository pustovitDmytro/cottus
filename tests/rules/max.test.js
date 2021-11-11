import { RuleTester } from '../utils';

suite('Rules: max');

test('Positive: numbers', function () {
    const tester = new RuleTester([ 'number', { 'max': 5 } ]);

    tester.positive(1, 1);
    tester.positive(1.5, 1.5);
});

test('Positive: empty value', function () {
    const tester = new RuleTester({ 'max': 5 });

    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Positive: string', function () {
    const tester = new RuleTester([ 'string', { 'max': 20 } ]);

    tester.positive('abc', 'abc');
    tester.positive('-123', '-123');
});

test('Positive: array', function () {
    const tester = new RuleTester([ { 'max': 20 } ]);

    tester.positive([ 'abc' ], [ 'abc' ]);
    tester.positive([], []);
});

test('Negative: numbers', function () {
    const tester = new RuleTester([ 'number', { 'max': 6 } ]);

    tester.negative(110, 'TOO_HIGH', 'The number is higher than the limit', { limit: 6 });
    tester.negative(10.5, 'TOO_HIGH', 'The number is higher than the limit', { limit: 6 });
});

test('Negative: string', function () {
    const tester = new RuleTester([ 'string', { 'max': 3 } ]);

    tester.negative('abd1', 'TOO_LONG', 'The value is longer than the limit', { limit: 3 });
});

test('Negative: array', function () {
    const tester = new RuleTester([ { 'max': 1 } ]);

    tester.negative([ 1, 2, 3, 4 ], 'TOO_LONG', 'The value is longer than the limit', { limit: 1 });
});

test('Negative: bad format', function () {
    const tester = new RuleTester([ { 'max': 5 } ]);

    tester.negative(false, 'WRONG_FORMAT', 'Format not supported');
});
