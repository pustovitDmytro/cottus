import { isValue } from 'myrmidon';
import { REQUIRED } from '../errors';
import Base from './Base';

export default class RequiredRule extends Base {
    static schema = 'required';

    validate(input) {
        if (!isValue(input)) throw new REQUIRED();

        return input;
    }

    static isOptional = false
}
