import { last } from 'myrmidon';
import {
    BAD_ENCRYPTION_HEADER,
    BAD_ENCRYPTION_FOOTER
} from '../errors';
import Base64Rule from './base64';
import StringRule from './string';

import Base from './Base';

export default class EncryptionKeyRule extends Base {
    static schema = [ 'encryption_key', 'encryptionKey' ];
    validate(input) {
        const stringRule = this.createChildRule(StringRule);
        const string = stringRule.validate(input);

        const lines = string.trim().split('\n');
        const header = lines[0];
        const footer = last(lines);

        if (!header.startsWith('-----BEGIN') || !header.endsWith('KEY-----')) throw new BAD_ENCRYPTION_HEADER();
        if (!footer.startsWith('-----END') || !footer.endsWith('KEY-----')) throw new BAD_ENCRYPTION_FOOTER();

        const base64Part = lines.slice(1,  -2).join('');
        const base64Rule = this.createChildRule(Base64Rule);

        base64Rule.validate(base64Part);

        return string;
    }
}
