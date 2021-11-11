import { isValue } from 'myrmidon';
import Base from './Base';

export default class defaultValueRule extends Base {
    static schema = 'default';

    validate(input) {
        if (!isValue(input)) return this.params;

        return input;
    }

    static isOptional = false
}
