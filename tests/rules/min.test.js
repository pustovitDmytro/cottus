import { RuleTester } from '../utils';

suite('Rules: min');

test('Positive: numbers', function () {
    const tester = new RuleTester([ 'number', { 'min': 5 } ]);

    tester.positive(10, 10);
    tester.positive(15.8, 15.8);
});

test('Positive: empty value', function () {
    const tester = new RuleTester({ 'min': 5 });

    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Positive: string', function () {
    const tester = new RuleTester([ 'string', { 'min': 2 } ]);

    tester.positive('abc', 'abc');
    tester.positive('-123', '-123');
});

test('Positive: array', function () {
    const tester = new RuleTester([ { 'min': 2 } ]);

    tester.positive([ 0, 1, 2, 3 ], [ 0, 1, 2, 3 ]);
});

test('Negative: numbers', function () {
    const tester = new RuleTester([ 'number', { 'min': 3 } ]);

    tester.negative(-10, 'TOO_LOW', 'The number is lower than the limit', { limit: 3 });
    tester.negative(0.5, 'TOO_LOW', 'The number is lower than the limit', { limit: 3 });
});

test('Negative: string', function () {
    const tester = new RuleTester([ 'string', { 'min': 5 } ]);

    tester.negative('abd', 'TOO_SHORT', 'The value is shorter than the limit', { limit: 5 });
    tester.negative('', 'TOO_SHORT', 'The value is shorter than the limit', { limit: 5 });
});

test('Negative: array', function () {
    const tester = new RuleTester([ { 'min': 5 } ]);

    tester.negative([ 1, 2 ], 'TOO_SHORT', 'The value is shorter than the limit', { limit: 5 });
    tester.negative([], 'TOO_SHORT', 'The value is shorter than the limit', { limit: 5 });
});

test('Negative: bad format', function () {
    const tester = new RuleTester([ { 'min': 5 } ]);

    tester.negative(false, 'WRONG_FORMAT', 'Format not supported');
});
