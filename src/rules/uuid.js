import { NOT_UUID } from '../errors';
import { Mask } from '../utils';
import StringRule from './string';
import Base from './Base';

// eslint-disable-next-line no-secrets/no-secrets
const hexNumbers = new Set('0123456789abcdef');

const hexFormatters = {
    f : char => hexNumbers.has(char),
    v : char => char === '4'
};

const mask = new Mask('ffffffff-ffff-vfff-ffff-ffffffffffff', hexFormatters);

/**
 * Checks value to be a uuid v4.
 * @depends string
 * @error NOT_UUID
 * @returns {string} valid input
 * @rule
 */
export default class UUIDRule extends Base {
    static schema = 'uuid';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);
        const error = mask.validate(string);

        if (error) throw new NOT_UUID();

        return string;
    }
}
