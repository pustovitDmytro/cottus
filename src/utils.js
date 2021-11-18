import { ASCII_RANGES } from './constants';

export function isASCII(type, code) {
    const { min, max } = ASCII_RANGES[type];

    return code <= max && code >= min;
}

export class Mask {
    constructor(pattern, formatters) {
        this.pattern = pattern;
        this.FormatChars = formatters;
        this.parse();
    }

    parse() {
        this._mask = [];

        let isNextEscaped = false;

        let  isNextOpional = false;

        for (const symbol of this.pattern) {
            if (isNextEscaped) {
                this._mask.push({
                    type     : 'constant',
                    optional : isNextOpional,
                    symbol
                });
                isNextEscaped = isNextOpional = false;
                continue;
            }

            if (symbol === '\\') {
                isNextEscaped = true;
                continue;
            }

            if (symbol === '?') {
                isNextOpional = true;
                continue;
            }

            const format = this.FormatChars[symbol];

            if (format) {
                this._mask.push({
                    type     : 'format',
                    format,
                    optional : isNextOpional
                });
                isNextOpional = false;

                continue;
            }

            isNextOpional = false;

            this._mask.push({
                type     : 'constant',
                symbol,
                optional : isNextOpional
            });
        }
    }
    validate(input) {
        let lastValidated = -1;

        for (const check of this._mask) {
            const toValidateIndex = lastValidated + 1;
            const value = input[toValidateIndex];

            let isValid = false;

            if (check.type === 'constant') isValid = check.symbol === value;
            if (check.type === 'format') isValid = check.format(value);

            if (!isValid) {
                if (!check.optional) return { check, value };
                continue;
            }

            lastValidated = toValidateIndex;
        }

        if (lastValidated !== input.length - 1) {
            return {
                check : null,
                value : input[lastValidated + 1]
            };
        }
    }
}

/* eslint-disable no-param-reassign */
// TODO: move to myrmidon
export function setProp(obj, prop, value, { delimiter = '.' } = {}) {
    let current = obj;

    prop.split(delimiter).forEach((token, index, tokens) => {
        const isLast = index === tokens.length - 1;

        if (!(token in current)) {
            if (isLast) return current[token] = value;
            const nextToken = tokens[index + 1];
            const isIndex = Number.isInteger(+nextToken);

            current[token] = isIndex ? [] : {};
        }

        current = current[token];
    });
}
/* eslint-enable no-param-reassign */
