import {
    toArray,
    isString,
    isObject
} from 'myrmidon';
import BaseError from './errors/format/Base';
import ValidationError from './errors/ValidationError';

export default class Validator {
    constructor(cottus, schema, parentContext) {
        this._schema = schema;
        this._cottus = cottus;
        this._hierarchy = [];
        if (parentContext) {
            this._hierarchy = parentContext.parent._nestedHierarhy(parentContext.key);
            this.parent = parentContext.parent;
        }
    }

    _nestedHierarhy(key) {
        return [ ...this._hierarchy, key ];
    }

    get isNested() {
        return !!this.parent;
    }

    _sendNestedErrors(errors) {
        this.parent._receiveNestedErrors(errors);
    }

    _receiveNestedErrors(errors) {
        if (this.isNested) {
            return this.parent._sendNestedErrors(errors);
        }

        this.nestedErrors.push(...errors);
    }

    parse() {
        this.rules = [];
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
            this.rules.push(new Rule({
                params,
                validator : this
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
        this.nestedErrors = [];
        let valid = input;
        const errors = [];

        for (const rule of this.rules) {
            try {
                valid = rule.run(valid);
            } catch (error) {
                if (error instanceof BaseError) {
                    if (!error.hasContext) {
                        error.setContext({
                            value : valid,
                            path  : this._hierarchy
                        });
                    }

                    errors.push(error);
                    break;
                }

                throw error;
            }
        }

        if (errors.length > 0) {
            if (this.isNested) {
                return this._sendNestedErrors(errors);
            }

            throw new ValidationError(this._cottus, errors);
        }

        if (this.nestedErrors.length > 0) {
            throw new ValidationError(this._cottus, this.nestedErrors);
        }

        return valid;
    }
}