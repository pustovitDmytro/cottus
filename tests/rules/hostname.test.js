// import { URL } from 'url';
import { RuleTester } from '../utils';

const tester = new RuleTester('hostname');

suite('Rules: hostname');

test('Positive: hostname', function () {
    tester.positive('localhost', 'localhost');
    tester.positive('example.org', 'example.org');
    tester.positive('redis-849305.c940.eu-central-1-1.ec2.cloud.redislabs.com', 'redis-849305.c940.eu-central-1-1.ec2.cloud.redislabs.com');
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_STRING', 'The value is not a string');
    tester.negative('http://localhost', 'INVALID_HOST', 'Host not valid');
    tester.negative('local host', 'INVALID_HOST', 'Host not valid');
    tester.negative('localhost:5040', 'INVALID_HOST', 'Host not valid');
});
