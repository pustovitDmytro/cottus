import { NOT_ALLOWED_VALUE } from '../errors';
import Base from './Base';

/**
 * Checks value to be one of possible options.
 * @param {array} options list of available options
 * @error NOT_ALLOWED_VALUE
 * @returns {any} valid input
 * @rule
 */
export default class EnumRule extends Base {
    static schema = 'enum';

    validate(input) {
        const available = this.params;

        if (!available.includes(input)) throw new NOT_ALLOWED_VALUE();

        return input;
    }
}
