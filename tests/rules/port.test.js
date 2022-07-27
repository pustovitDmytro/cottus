import { RuleTester } from '../utils';

const tester = new RuleTester('port');

suite('Rules: port #skip-example');

test('Positive: numbers', function () {
    tester.positive(0, 0);
    tester.positive(8080, 8080);
    tester.positive(443, 443);
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: numbers', function () {
    tester.negative(Number.NaN, 'WRONG_PORT_NUMBER', "The number didn't look like a valid TCP port number [0, 65535]");
    tester.negative(0.5, 'WRONG_PORT_NUMBER', "The number didn't look like a valid TCP port number [0, 65535]");
    tester.negative(-43, 'WRONG_PORT_NUMBER', "The number didn't look like a valid TCP port number [0, 65535]");
    tester.negative(390_332, 'WRONG_PORT_NUMBER', "The number didn't look like a valid TCP port number [0, 65535]");
});
