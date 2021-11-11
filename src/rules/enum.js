import { NOT_ALLOWED_VALUE } from '../errors';
import Base from './Base';

export default class EnumRule extends Base {
    static schema = 'enum';

    validate(input) {
        const available = this.params;

        if (!available.includes(input)) throw new NOT_ALLOWED_VALUE();

        return input;
    }
}
