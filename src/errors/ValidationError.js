import { setProp } from '../utils';

export default class CottusValidationError extends Error {
    #cottus;
    #errors;

    constructor(cottus, errors) {
        super();
        this.name = this.constructor.name;
        this.#cottus = cottus;
        this.#errors = errors;
    }

    get errors() {
        return this.#errors;
    }

    get message() {
        return `Validation Failed: ${this.#errors.length} error(s) occured\n${this.prettify}`;
    }

    get prettify() {
        const prettty = {};

        for (const formatError of this.errors) {
            const message = `${formatError.code}: ${formatError.message}`;

            setProp(
                prettty,
                formatError.path.join('.'),
                message
            );
        }

        return JSON.stringify(prettty, null, 2);
    }

    get hash() {
        return {
            code    : 'VALIDATION_ERROR',
            details : this.#errors.map(e => e.hash)
        };
    }

    isValidationError = true;

    toJSON() {
        return JSON.stringify(this.hash);
    }
}
