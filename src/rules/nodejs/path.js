import path from 'path';
import { ILLEGAL_PATH } from '../../errors';
import StringRule from '../string';

import Base from '../Base';

const UNIX_FORBIDDEN_SYMBOLS = [ '/', '\u0000' ];
const WINDOWS_FORBIDDEN_SYMBOLS = [ '<', '>', ':', '"', '/', '\\', '|', '?', '*' ];
const ASCII_LAST_CONTROL_CHARACTER = 31;

export default class PathRule extends Base {
    static schema = 'path';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);
        const normalized = path.normalize(string).trim();

        for (const part of normalized.split(path.sep)) {
            for (const char of part) {
                const isForbidden = [ ...UNIX_FORBIDDEN_SYMBOLS, ...WINDOWS_FORBIDDEN_SYMBOLS ].includes(char);
                const isASCIIControl = char.charCodeAt(0) >= 0 && char.charCodeAt(0) <= ASCII_LAST_CONTROL_CHARACTER;

                if (isForbidden || isASCIIControl) throw new ILLEGAL_PATH();
            }
        }

        return normalized;
    }
}
