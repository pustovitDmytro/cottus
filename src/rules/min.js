import { isNumber, isString, isArray } from 'myrmidon';
import {
    WRONG_FORMAT,
    TOO_LOW,
    TOO_SHORT
} from '../errors';
import Base from './Base';

/**
 * Checks value to be more than threshold.
 * @param {integer} threshold min possible value
 * @error TOO_LOW
 * @error TOO_SHORT
 * @error WRONG_FORMAT
 * @returns {any} valid string, number or array
 * @rule
 */
export default class MinRule extends Base {
    static schema = 'min';
    validate(input) {
        const threshold = this.params;

        if (isNumber(input)) {
            if (input < threshold) throw new TOO_LOW(threshold);

            return input;
        }

        if (isString(input)) {
            if (input.length < threshold) throw new TOO_SHORT(threshold);

            return input;
        }

        if (isArray(input)) {
            if (input.length < threshold) throw new TOO_SHORT(threshold);

            return input;
        }


        throw new WRONG_FORMAT();
    }
}
