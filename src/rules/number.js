import { isNumber, isString } from 'myrmidon';
import { NOT_NUMBER } from '../errors';
import Base from './Base';

export default class NumberRule extends Base {
    static schema = 'number';
    validate(input) {
        const casted = isString(input)
            ? Number.parseFloat(input)
            : input;

        if (!isNumber(casted)) throw new NOT_NUMBER();

        return casted;
    }
}
