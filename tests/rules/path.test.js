import path from 'path';
import { RuleTester } from '../utils';

const tester = new RuleTester('path');

suite('Rules: path');

test('Positive: path', function () {
    tester.positive('file.js', 'file.js');
    tester.positive('/tmp//file.js', path.normalize('/tmp/file.js'));
    tester.positive('./file.js', 'file.js');
    tester.positive(' /home/user/../file.js     ', path.normalize('/home/file.js'));
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad formats', function () {
    tester.negative({ object: 1 }, 'NOT_STRING', 'The value is not a string');
    tester.negative('file.\u0000\u0000\u0000js', 'ILLEGAL_PATH', 'string can not be used as legal file path');
    tester.negative('file.*js', 'ILLEGAL_PATH', 'string can not be used as legal file path');
    tester.negative(`/subdir/${String.fromCodePoint(10)}smth/file.js`, 'ILLEGAL_PATH', 'string can not be used as legal file path');
});
