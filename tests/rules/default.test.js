import { RuleTester } from '../utils';

const tester = new RuleTester({ 'default': 100 });

suite('Rules: default');

test('Positive: set default value', function () {
    tester.positive(null, 100);
    tester.positive(undefined, 100);
});

test('Positive: skip if value is already set', function () {
    tester.positive(false, false);
    tester.positive(Number.NaN, Number.NaN);
    tester.positive(0, 0);
    tester.positive('', '');
});
