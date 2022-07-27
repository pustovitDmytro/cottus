import { isNumber, isString, isArray } from 'myrmidon';
import {
    WRONG_FORMAT,
    TOO_HIGH,
    TOO_LONG
} from '../errors';
import Base from './Base';

/**
 * Checks value to be less than threshold.
 * @param {integer} threshold max possible value
 * @error TOO_HIGH
 * @error TOO_LONG
 * @error WRONG_FORMAT
 * @returns {any} valid string, number or array
 * @rule
 */
export default class MaxRule extends Base {
    static schema = 'max';
    validate(input) {
        const threshold = this.params;

        if (isNumber(input)) {
            if (input > threshold) throw new TOO_HIGH(threshold);

            return input;
        }

        if (isString(input)) {
            if (input.length > threshold) throw new TOO_LONG(threshold);

            return input;
        }

        if (isArray(input)) {
            if (input.length > threshold) throw new TOO_LONG(threshold);

            return input;
        }


        throw new WRONG_FORMAT();
    }
}
