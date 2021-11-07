import { RuleTester } from '../utils';

const tester = new RuleTester('string');

suite('Rules: string');

test('Positive: string', function () {
    tester.positive('5', '5');
    tester.positive('odsozci@jiswupre.co.uk', 'odsozci@jiswupre.co.uk');
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative(4, 'NOT_STRING', 'The value is not a string');
    tester.negative({ object: 1 }, 'NOT_STRING', 'The value is not a string');
    tester.negative(false, 'NOT_STRING', 'The value is not a string');
    tester.negative(true, 'NOT_STRING', 'The value is not a string');
    tester.negative([ 'fkdsfdsfkds' ], 'NOT_STRING', 'The value is not a string');
});
