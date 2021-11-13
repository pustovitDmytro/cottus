import { RuleTester } from '../utils';

const tester = new RuleTester('time_unit');

suite('Rules: time_unit');

test('Positive: time_unit', function () {
    tester.positive('1s', 1000);
    tester.positive(' -1000', -1000);
    tester.positive(0, 0);
    tester.positive(' -2 hours ', -2 * 60 * 60 * 1000);
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative(true, 'WRONG_FORMAT', 'Format not supported');

    tester.negative('very long time', 'WRONG_TIME_UNIT', 'The value can not be parsed as time unit');
    tester.negative('78 days/h', 'WRONG_TIME_UNIT', 'The value can not be parsed as time unit');
});
