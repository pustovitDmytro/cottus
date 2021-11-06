import path from 'path';
import { assert } from 'chai';
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

    positive(input, output) {
        const result = this._validator.validate(input);

        assert.deepEqual(result, output);
    }

    negative(input, code, message) {
        try {
            this._validator.validate(input);
            assert.fail('rule should fail');
        } catch (error) {
            if (!(error instanceof this._ValidationError)) throw error;
            const json = error.toJSON();

            assert.deepEqual(json.details[0], {
                code,
                message,
                value : input
            });
        }
    }
}
