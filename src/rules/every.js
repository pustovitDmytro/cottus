import { isArray } from 'myrmidon';
import { NOT_ARRAY } from '../errors';
import Base from './Base';

/**
 * Validate array items.
 * @param {rule} rule nested rule to check
 * @error NOT_ARRAY
 * @returns {array} array with validated items
 * @rule
 */
export default class EveryRule extends Base {
    static schema = 'every';

    validate(input) {
        if (!isArray(input)) throw new NOT_ARRAY();
        const valid = [];
        const rule = this.params;

        for (const value of input) {
            const validator = this.createNestedValidator(rule, valid.length);

            valid.push(validator.validate(value));
        }

        return valid;
    }
}
