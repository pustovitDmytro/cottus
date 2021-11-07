import { assert } from 'chai';
import cottus from '../entry';
import { ensureError } from '../utils';

suite('Validator: hierarchy');

const validContact = {
    type  : 'email',
    value : 'ot@fiben.kw'
};

const invalidContact = {
    type  : null,
    value : 'ar@mijbaso.om'
};

const userData = {
    id   : '6840f266-27ef-5a9f-87f0-9ec9a226fddc',
    name : 'Sue Fisher'
};

const complexHierarhyRule = { 'attributes' : {
    'id'       : [ 'required' ],
    'name'     : [ 'required' ],
    'contacts' : [ 'required', { 'every' : { 'attributes' : {
        'type'  : [ 'required' ],
        'value' : [ 'required' ]
    } } } ]
} };

test('Positive: valid hierarchy', function () {
    const validHierarhy = {
        ...userData,
        contacts : [ validContact, validContact, validContact ]
    };

    const validator = cottus.compile(complexHierarhyRule);
    const valid = validator.validate(validHierarhy);

    assert.deepEqual(valid, validHierarhy);
});

test('Negative: invalid hierarchy on top level', async function () {
    const validator = cottus.compile(complexHierarhyRule);
    const error = ensureError(() => validator.validate(false));

    assert.isTrue(error.isValidationError);
    assert.deepEqual(error.hash, {
        code    : 'VALIDATION_ERROR',
        details : [
            {
                'code'    : 'NOT_OBJECT',
                'message' : 'The value have to be plain js object',
                'value'   : false,
                'path'    : []
            }
        ]
    });
});

test('Negative: invalid hierarchy on middle level', async function () {
    const wrongHierarhy = {
        ...userData
    };
    const validator = cottus.compile(complexHierarhyRule);
    const error = ensureError(() => validator.validate(wrongHierarhy));

    assert.isTrue(error.isValidationError);
    assert.deepEqual(error.hash, {
        code    : 'VALIDATION_ERROR',
        details : [
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'value'   : undefined,
                'path'    : [ 'contacts' ]
            }
        ]
    });
});

test('Negative: invalid hierarchy on deep level', async function () {
    const wrongHierarhy = {
        ...userData,
        contacts : [ validContact, invalidContact ]
    };
    const validator = cottus.compile(complexHierarhyRule);
    const error = ensureError(() => validator.validate(wrongHierarhy));

    assert.isTrue(error.isValidationError);
    assert.deepEqual(error.hash, {
        code    : 'VALIDATION_ERROR',
        details : [
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'value'   : null,
                'path'    : [ 'contacts', 1, 'type' ]
            }
        ]
    });
});


test('Negative: handle simultanious errors', async function () {
    const wrongHierarhy = {
        contacts : [ invalidContact, validContact, invalidContact ]
    };
    const validator = cottus.compile(complexHierarhyRule);
    const error = ensureError(() => validator.validate(wrongHierarhy));

    assert.isTrue(error.isValidationError, error.toString());
    assert.deepEqual(error.hash, {
        code    : 'VALIDATION_ERROR',
        details : [
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'path'    : [ 'id' ],
                'value'   : undefined
            },
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'path'    : [ 'name' ],
                'value'   : undefined
            },
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'value'   : null,
                'path'    : [ 'contacts', 0, 'type' ]
            },
            {
                'code'    : 'REQUIRED',
                'message' : 'The value is required',
                'value'   : null,
                'path'    : [ 'contacts', 2, 'type' ]
            }
        ]
    });
});
