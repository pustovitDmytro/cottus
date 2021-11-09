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
            if (error.code === 'ERR_INVALID_URL') throw new INVALID_URL();
            throw error;
        }
    }
}
