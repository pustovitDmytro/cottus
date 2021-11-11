import { URL } from 'url';
import { INVALID_URL } from '../../errors';
import StringRule from '../string';

import Base from '../Base';

export default class URLRule extends Base {
    static schema = 'url';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);

        try {
            return new URL(string);
        } catch (error) {
            throw new INVALID_URL(error.code);
        }
    }
}
