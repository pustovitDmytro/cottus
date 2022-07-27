import { NOT_BASE64 } from '../errors';
import StringRule from './string';

import Base from './Base';

/**
 * Checks input to be a valid base64 string.
 * @spec https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 * @depends string
 * @error NOT_BASE64
 * @returns {string} valid base64 string
 * @rule
 */
export default class Base64Rule extends Base {
    static schema = 'base64';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);

        const isBase64 = Buffer.from(string, 'base64').toString('base64') === string;

        if (!isBase64) throw new NOT_BASE64();

        return string;
    }
}
