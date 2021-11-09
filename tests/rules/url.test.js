import { URL } from 'url';
import { RuleTester } from '../utils';

const tester = new RuleTester('url');

suite('Rules: url');

test('Positive: url', function () {
    tester.positive('https://ec.ne/capih', new URL('https://ec.ne/capih'));
    tester.positive('http://localhost:60606',  new URL('http://localhost:60606'));
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_STRING', 'The value is not a string');
    tester.negative('google', 'INVALID_URL', 'The value is invalid URL');
    tester.negative('http://localhost:234543580', 'INVALID_URL', 'The value is invalid URL');
});
