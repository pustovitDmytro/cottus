import { WRONG_EMAIL } from '../errors';
import { isASCII } from '../utils';
import StringRule from './string';
import Base from './Base';

const atextAllowed = new Set([ '!', '#', '$', '%', '&', "'", '*', '+', '-', '/', '=', '?', '^', '_', '`', '{', '|', '}', '~' ]);
const atextRestricted = new Set([ '(', ')', '<', '[', ':', '@', ',', '>', ']', ';', '\\', '.', '"' ]);


function isDtext(code) {
    // eslint-disable-next-line no-magic-numbers
    return code >= 33 && code <= 90 || code >= 94 && code <= 126;
}

function isDomAtom(string) {
    return [ ...string ].every((char, i) => {
        const code = char.codePointAt(0);

        if (isASCII('numeric', code) || isASCII('upperAlpha', code) || isASCII('lowerAlpha', code)) return true;
        if (atextAllowed.has(char)) return true;
        if (char === '.' && i !== 0 && i !== string.length - 1) return true;

        return false;
    });
}

function isQuotedString(string) {
    const isQuoted = string[0] === '"' && string[string.length - 1] === '"';

    if (!isQuoted) return false;

    return [ ...string.slice(1,  -2) ].some(char => atextRestricted.has(char));
}

/**
 * Checks input to be a valid email address.
 * @spec https://datatracker.ietf.org/doc/html/rfc5322#section-3.4.1
 * @depends string
 * @error WRONG_EMAIL
 * @returns {string} valid email
 * @rule
 */
export default class EmailRule extends Base {
    static schema = 'email';
    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);

        const [ domain, ...localParts ] = string.split('@').reverse();
        const localPart = localParts.reverse().join('@');

        if (!isDomAtom(localPart) && !isQuotedString(localPart)) throw new WRONG_EMAIL('LOCAL-PART');
        // TODO: check ipv4/ipv6 instead isDtext
        if (!isDomAtom(domain) && ![ ...domain ].every(char => isDtext(char.codePointAt(0)))) throw new WRONG_EMAIL('DOMAIN-PART');

        return string;
    }
}

