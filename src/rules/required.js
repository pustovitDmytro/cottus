import { isValue } from 'myrmidon';
import { REQUIRED } from '../errors';

export default class RequiredRule {
    static schema = 'required';
    static errors = { REQUIRED }

    validate(input) {
        const e = this.constructor.errors;

        if (!isValue(input)) throw new e.REQUIRED();

        return input;
    }
}
