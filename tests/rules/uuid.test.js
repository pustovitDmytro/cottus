import { RuleTester } from '../utils';

const tester = new RuleTester('uuid');

suite('Rules: uuid');

const valid = [
    'b69f3671-01eb-4802-88f5-0bf567a9522c',
    '497680db-4963-488f-82ee-3ec0e734a7b6'
];

test('Positive: uuid', function () {
    for (const uuid of valid) {
        tester.positive(uuid, uuid);
    }
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

const invalid = [
    '00000000000000000000',
    'b4f32bd7-581c-5621-a698-33fa4d9fc14b' // v5
];

test('Negative: bad formats', function () {
    tester.negative(true, 'NOT_STRING', 'The value is not a string');
    tester.negative([ 'abimem@fe.bh' ], 'NOT_STRING', 'The value is not a string');

    for (const uuid of invalid) {
        tester.negative(uuid, 'NOT_UUID', 'The value is not a valid UUID v4');
    }
});
