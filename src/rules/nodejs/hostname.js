import { NOT_STRING, INVALID_HOST } from '../../errors';
import StringRule from '../string';
import Base from '../Base';
import URLRule from './url';


export default class HostnameRule extends Base {
    static schema = 'hostname';
    static errors = [ NOT_STRING ];
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);
        const urlRule = this.createChildRule(URLRule);
        const url = urlRule.validate(`https://${string}`);

        if (url.hostname !== string) throw new INVALID_HOST();

        return string;
    }
    static defaultError = () => new INVALID_HOST()
}
