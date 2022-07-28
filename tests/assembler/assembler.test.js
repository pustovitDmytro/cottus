/* eslint-disable no-secrets/no-secrets */
// import { assert } from 'chai';
import { URL } from 'url';
import { assert } from 'chai';
import cottus from '../entry';
import { load, ensureError } from '../utils';

const { Assembler } = load('index.js');

suite('Assembler');

const config = {
    'web' : {
        'appName'       : 'cottus-example-app',
        'port'          : { $source: '{PORT}', $validate: [ 'required', 'port' ] },
        'apiVersion'    : { $source: '{API_VERSION}', $validate: [ 'required', 'integer', { 'min': 1 } ] },
        'privateApiURL' : { $source: 'http://localhost:{PORT}/api/{API_VERSION}', $validate: 'url' }
    },
    'administrators' : {
        $source   : { type: 'complex_array', prefix: 'ADMIN_' },
        $validate : {
            'login'     : { $source: '{_LOGIN}', $validate: [ 'required', 'email' ] },
            'password'  : { $source: '{_PASSWORD}', $validate: [ 'string' ] },
            permissions : {
                $source   : { type: 'simple_array', prefix: '_PERMISSIONS_' },
                $validate : { 'enum': [ 'read', 'write' ] }
            }
        }
    },
    'dbURL' : {
        $source   : { if: 'USE_DB', template: '{DB_URL}' },
        $validate : [ 'url' ]
    }
};

test('Positive: valid values', function () {
    const assembler = new Assembler(cottus, config);

    assembler.parse();

    const valid = assembler.run({
        PORT        : '1111',
        API_VERSION : '2',

        ADMIN_0_LOGIN    : 'admin@mail.com',
        ADMIN_0_PASSWORD : 'vaO7EPawfGKnbl0JBqp',
        ADMIN_1_LOGIN    : 'dicomsab@rid.gy',
        ADMIN_1_PASSWORD : '8qMJV8zqvKDcxcsBgl',

        ADMIN_0_PERMISSIONS_0 : 'read',
        ADMIN_0_PERMISSIONS_1 : 'write',

        DB_URL : 'http://atmow.lk/jon'
    });

    assert.deepEqual(valid, {
        'web' : {
            'appName'       : 'cottus-example-app',
            'port'          : 1111,
            'apiVersion'    : 2,
            'privateApiURL' : new URL('http://localhost:1111/api/2')
        },
        'administrators' : [
            {
                'login'       : 'admin@mail.com',
                'password'    : 'vaO7EPawfGKnbl0JBqp',
                'permissions' : [ 'read', 'write' ]
            },
            {
                'login'    : 'dicomsab@rid.gy',
                'password' : '8qMJV8zqvKDcxcsBgl'
            }
        ],
        'dbURL' : new URL('http://atmow.lk/jon')
    });
});

test('Positive: empty values', function () {
    const assembler = new Assembler(cottus, {
        'value' : { $source: '{VALUE}', $validate: [ 'required', 'integer' ] },
        'empty' : { $source: '{EMPTY_VALUE}', $validate: [ 'cron' ] },
        'no'    : { $source: '{NO_VALUE}', $validate: [ 'email' ] }
    });

    assembler.parse();

    const valid = assembler.run({
        VALUE       : '1',
        EMPTY_VALUE : ''
    });

    assert.deepEqual(valid, {
        value : 1,
        empty : null,
        no    : null
    });
});

test('Negative: validation errors', function () {
    const assembler = new Assembler(cottus, config);

    assembler.parse();

    const error = ensureError(() => assembler.run({
        PORT        : 'jack',
        API_VERSION : '2',

        ADMIN_0_LOGIN    : 'admin@mail.com',
        ADMIN_1_LOGIN    : 'e.r',
        ADMIN_1_PASSWORD : '8qMJV8zqvKDcxcsBgl',

        ADMIN_0_PERMISSIONS_0 : 'read',
        ADMIN_0_PERMISSIONS_1 : 'execute',

        DB_URL : 'http://atmow.lk/jon'
    }));

    assert.isTrue(error.isAssemblerError);
    assert.deepEqual(JSON.parse(error.prettify), {
        'web' : {
            'port'          : "WRONG_PORT_NUMBER: The number didn't look like a valid TCP port number [0, 65535]",
            'privateApiURL' : 'INVALID_URL: The value is invalid URL'
        },
        'administrators' : [
            {
                'permissions' : [
                    null,
                    'NOT_ALLOWED_VALUE: The value is not allowed'
                ]
            }
        ]
    });
});
