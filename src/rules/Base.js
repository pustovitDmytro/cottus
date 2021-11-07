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
            isValue(key) && { parent: this.validator, key }
        );
    }

    createChildRule(Rule) {
        return new Rule({
            validator : this.validator
        });
    }

    run(input) {
        const { defaultError, errors } = this.constructor;
        const skip = this.constructor.isOptional && !isValue(input);

        if (skip) return input;
        try {
            if (this.alias) {
                const aliasValidator = this.createNestedValidator(this.alias);

                return aliasValidator.validate(input);
            }

            return this.validate(input);
        } catch (error) {
            if (defaultError && !errors?.some(E => error instanceof E)) {
                throw defaultError(error);
            }

            throw error;
        }
    }

    static isOptional = true
}
