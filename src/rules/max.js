import { isNumber, isString, isArray } from 'myrmidon';
import {
    WRONG_FORMAT,
    TOO_HIGH,
    TOO_LONG
} from '../errors';
import Base from './Base';

export default class MaxRule extends Base {
    static schema = 'max';
    validate(input) {
        const threshold = this.params;

        if (isNumber(input)) {
            if (input > threshold) throw new TOO_HIGH();

            return input;
        }

        if (isString(input)) {
            if (input.length > threshold) throw new TOO_LONG();

            return input;
        }

        if (isArray(input)) {
            if (input.length > threshold) throw new TOO_LONG();

            return input;
        }


        throw new WRONG_FORMAT();
    }
}
