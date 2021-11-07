import {
    toArray,
    isString,
    isObject
} from 'myrmidon';
import BaseError from './errors/format/Base';
import ValidationError from './errors/ValidationError';

export default class Validator {
    constructor(cottus, schema, hierarchy) {
        this._schema = schema;
        this._cottus = cottus;
        this._hierarchy = hierarchy;
    }

    parse() {
        this._validators = [];
        toArray(this._schema).forEach(schema => {
            let rulename = null;

            let params = null;

            const isSimple = isString(schema);
            const isComplex = isObject(schema) && Object.keys(schema).length === 1;

            if (isSimple) rulename = schema;
            if (isComplex) {
                rulename = Object.keys(schema)[0];
                params = Object.values(schema)[0];
            }

            const Rule = this._cottus.rules[rulename];

            if (!Rule) throw new Error(`Rule [${rulename}] not found`);
            this._validators.push(new Rule({
                cottus    : this._cottus,
                params,
                hierarchy : this._hierarchy
            }));
        });
    }

    // async function v() {
    //     const rule = new RequiredRule(params);

    //     try {
    //         rule.validate(input, context);
    //     } catch (error) {
    //         error.setContext(context); // check static
    //         throw error;
    //     }
    // }


    validate(input) {
        let valid = input;
        const errors = [];

        for (const validator of this._validators) {
            try {
                valid = validator.validate(valid);
            } catch (error) {
                if (!(error instanceof BaseError)) throw error;
                if (!error.hasContext) {
                    error.setContext({
                        value : valid,
                        path  : this._hierarchy
                    });
                }

                errors.push(error);
                break;
            }
        }

        if (errors.length > 0) {
            throw new ValidationError(this._cottus, errors);
        }

        return valid;
    }
}
