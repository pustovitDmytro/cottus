import { isValue } from 'myrmidon';
import Base from './Base';

/**
 * Set default value.
 * @param {any} defaultValue value to set as a default
 * @returns {any} defaultValue if nothing is set or input othervise
 * @rule
 */
export default class defaultValueRule extends Base {
    static schema = 'default';

    validate(input) {
        if (!isValue(input)) return this.params;

        return input;
    }

    static isOptional = false;
}
