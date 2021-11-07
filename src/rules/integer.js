import { NOT_INTEGER } from '../errors';
import NumberRule from './number';
import Base from './Base';

export default class IntegerRule extends Base {
    static schema = 'integer';
    validate(input) {
        const parentRule = this.createChildRule(NumberRule);
        const number = parentRule.validate(input);

        if (!Number.isInteger(number)) throw new NOT_INTEGER();

        return number;
    }
}
