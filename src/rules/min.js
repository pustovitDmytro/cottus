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
            if (input < threshold) throw new TOO_LOW();

            return input;
        }

        if (isString(input)) {
            if (input.length < threshold) throw new TOO_SHORT();

            return input;
        }

        if (isArray(input)) {
            if (input.length < threshold) throw new TOO_SHORT();

            return input;
        }


        throw new WRONG_FORMAT();
    }
}
