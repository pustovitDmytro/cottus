import StringRule from './string';
import Base from './Base';

export default class ToLowercaseRule extends Base {
    static schema = [ 'to_lowercase', 'to_lower' ];

    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);

        return string.toLowerCase();
    }
}
