import { isValue } from 'myrmidon';
import { REQUIRED } from '../errors';
import Base from './Base';
/**
 * Checks value is present.
 * @error REQUIRED
 * @returns {any} any defined value
 * @rule
 */
export default class RequiredRule extends Base {
    static schema = 'required';

    validate(input) {
        if (!isValue(input)) throw new REQUIRED();

        return input;
    }

    static isOptional = false;
}
