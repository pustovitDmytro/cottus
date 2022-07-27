import { isObject } from 'myrmidon';
import { NOT_OBJECT } from '../errors';
import Base from './Base';

/**
 * Checks object properties.
 * @param {object} properties mapping with rules for each property
 * @error NOT_OBJECT
 * @returns {object} valid object
 * @rule
 */
export default class AttributesRule extends Base {
    static schema = 'attributes';
    validate(input) {
        if (!isObject(input)) throw new NOT_OBJECT();
        const valid = {};

        for (const attribute of Object.keys(this.params)) {
            const validator = this.createNestedValidator(
                this.params[attribute],
                attribute
            );

            valid[attribute] = validator.validate(input[attribute]);
        }

        return valid;
    }
}
