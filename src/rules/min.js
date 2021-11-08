import { isNumber, isString, isArray } from 'myrmidon';
import {
    WRONG_FORMAT,
    TOO_LOW,
    TOO_SHORT
} from '../errors';
import Base from './Base';

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
