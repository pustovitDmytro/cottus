import { isValue } from 'myrmidon';

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

    createChildRule(Rule) {
        return new Rule({
            validator : this.validator
        });
    }

    run(input) {
        const skip = this.constructor.isOptional && !isValue(input);

        if (skip) return input;

        return this.validate(input);
    }

    static isOptional = true
}
