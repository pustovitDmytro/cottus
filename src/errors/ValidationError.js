export default class ValidationError extends Error {
    constructor(cottus, errors) {
        super();
        this.cottus = cottus;
        this.errors = errors;
    }

    toJSON() {
        return {
            code    : 'VALIDATION_ERROR',
            details : this.errors.map(e => e.hash)
        };
    }
}
