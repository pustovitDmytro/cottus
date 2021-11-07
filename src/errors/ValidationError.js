export default class CottusValidationError extends Error {
    constructor(cottus, errors) {
        super();
        this.name = this.constructor.name;
        this.cottus = cottus;
        this.errors = errors;
    }

    get message() {
        return `Vaildation Failed: ${this.errors.length} error(s) occured\n${this.prettify}`;
    }

    get prettify() {
        return JSON.stringify(this.errors.map(e => e.hash));
    }

    get hash() {
        return {
            code    : 'VALIDATION_ERROR',
            details : this.errors.map(e => e.hash)
        };
    }

    isValidationError = true;

    toJSON() {
        return JSON.stringify(this.hash);
    }
}
