import { isString } from 'myrmidon';
import { NOT_STRING } from '../errors';
import Base from './Base';

export default class StringRule extends Base {
    static schema = 'string';
    validate(input) {
        if (!isString(input)) throw new NOT_STRING();

        return input;
    }
}
