import { RuleTester } from '../utils';

const tester = new RuleTester('cron');

suite('Rules: cron');

const valid = [
    '0 4 8-14 * *',
    '0 0 1,15 * 3',
    '5 0 * 8 *',
    '23 0-20/2 * * *',
    '5-10 4 */3 * sun',
    '0 0,5-12 1 */2 *'
];

test('Positive: cron', function () {
    for (const cron of valid) {
        tester.positive(cron, cron);
    }
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative(true, 'NOT_STRING', 'The value is not a string');
    tester.negative([ '0', '4', '8-14', '*', '*' ], 'NOT_STRING', 'The value is not a string');
});

test('Negative: malformed cron', function () {
    tester.negative('0 22 * 1-5', 'INVALID_CRON', 'The value can not be parsed as cron string');
    tester.negative('0 22 * * * *', 'INVALID_CRON', 'The value can not be parsed as cron string');
    tester.negative('5-10 4 */3 * SUNDAY', 'INVALID_CRON', 'The value can not be parsed as cron string');
});

