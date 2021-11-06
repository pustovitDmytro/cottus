import { toArray } from 'myrmidon';
import BaseError from './errors/Base';
import ValidationError from './errors/ValidationError';

// const schema = [ 'boolean' ];
// const deep =  { 'object' : {
//     name            : [ 'string', { 'min': 3 } ],
//     password        : [ 'password' ],
//     confirmPassword : [ 'required', { 'eq': { '$ref': 'password' } } ]
// } };

// const array = [ 'array', { every: { object: {} } } ];


class Validator {
    constructor(cottus, schema) {
        this._schema = schema;
        this._cottus = cottus;
    }

    parse() {
        this._validators = [];
        toArray(this._schema).forEach(schema => {
            const Rule = this._cottus.rules[schema];

            this._validators.push(new Rule());
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
                error.setContext(valid);
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

export default class Cottus {
    constructor(conf = {}) {
        this.rules = {};
        this.addRules(conf.rules || []);
    }

    compile(schema) {
        const validator = new Validator(this, schema);

        validator.parse();

        return validator;
    }

    addRules(rules) {
        rules.forEach(rule => this.rules[rule.schema] = rule);
    }

    addRule(rule) {
        this.addRules([ rule ]);
    }
}
