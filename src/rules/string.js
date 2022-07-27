import { isString } from 'myrmidon';
import { NOT_STRING } from '../errors';
import Base from './Base';
/**
 * Checks value to be a string.
 * @error NOT_STRING
 * @returns {any} valid input
 * @rule
 */
export default class StringRule extends Base {
    static schema = 'string';
    validate(input) {
        if (!isString(input)) throw new NOT_STRING();

        return input;
    }
}
