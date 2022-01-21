import path from 'path';
import { inspect } from 'util';
import { assert } from 'chai';
import { isString } from 'myrmidon';
import { entry } from './constants';

export function load(relPath, clearCache) {
    const absPath = path.resolve(entry, relPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];
    // eslint-disable-next-line security/detect-non-literal-require
    const result =  require(absPath);

    if (clearCache) delete require.cache[require.resolve(absPath)];

    return result;
}

export function resolve(relPath) {
    return require.resolve(path.join(entry, relPath));
}

export class RuleTester {
    constructor(rules) {
        const { default:cottus, ValidationError } = load('index.js');

        this._validator = cottus.compile(rules);
        this._ValidationError = ValidationError;
    }

    positive(input, output, msg) {
        const result = this._validator.validate(input);

        assert.deepEqual(result, output, msg);
    }

    negative(input, code, message, payload) {
        const error = ensureError(
            () => this._validator.validate(input),
            input
        );

        if (!(error instanceof this._ValidationError)) throw error;
        if (!isString(code)) {
            assert.deepEqual(JSON.parse(error.prettify), code, inspect(input));
        } else {
            const hash = error.hash.details[0];

            assert.deepOwnInclude(hash, {
                code,
                message,
                path  : [],
                value : input
            }, inspect(input));
            if (payload) assert.deepEqual(hash.payload, payload, 'payload');
        }
    }
}


export function ensureError(handler, msg) {
    try {
        handler();
        assert.fail(`Expected ${handler.toString()} to throw an error ${msg}`);
    } catch (error)  {
        if (error.name === 'AssertionError') throw error;

        return error;
    }
}

export async function ensureErrorAsync(handler) {
    try {
        await handler();
        assert.fail('Expected to throw an error');
    } catch (error)  {
        if (error.name === 'AssertionError') throw error;

        return error;
    }
}

