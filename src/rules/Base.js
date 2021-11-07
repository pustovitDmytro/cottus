export default class BaseRule {
    constructor({ params, validator }) {
        this.validator = validator;
        this.cottus = this.validator._cottus;
        this.params = params;
    }

    createNestedValidator(schema, key) {
        return this.cottus.compile(
            schema,
            { parent: this.validator, key }
        );
    }
}
