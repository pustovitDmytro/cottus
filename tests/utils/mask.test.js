import { assert } from 'chai';
import { load } from '../utils';

const { Mask } = load('utils.js');

suite('utils: Mask');

const mask = new Mask('aa?a-00\\0', {
    a : s => [ 'a', 'b', 'c' ].includes(s),
    0 : s => [ '1', '2', '3' ].includes(s)
});

test('Positive: mask', function () {
    const valid = [
        'bc-120',
        'bcc-310'
    ];

    valid.forEach(v => assert.notExists(mask.validate(v)));
});

test('Negative: mask', function () {
    assert.deepEqual(
        mask.validate('aaat'),
        {
            'check' : {
                'optional' : false,
                'symbol'   : '-',
                'type'     : 'constant'
            },
            'value' : 't'
        }
    );

    assert.deepEqual(
        mask.validate('aa-120k'),
        {
            'check' : null,
            'value' : 'k'
        }
    );
});
