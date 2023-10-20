import { RuleTester } from '../utils';

const tester = new RuleTester('date');

suite('Rules: date');

test('Positive: numbers', function () {
    const d = new Date();

    tester.positive(+d, d);
});

test('Positive: string', function () {
    tester.positive('04 Dec 1995 00:12:00 GMT', new Date('1995-12-04T00:12:00.000Z'));
    tester.positive('2022-10-20T19:33:38.118Z', new Date('2022-10-20T19:33:38.118Z'));
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

const txt = 'The value is not a valid date';

test('Negative: numbers', function () {
    tester.negative(Number.NaN, 'NOT_DATE', txt);
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_DATE', txt);
    tester.negative('x', 'NOT_DATE', txt);
});
