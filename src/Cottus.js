import Validator from './Validator';

export default class Cottus {
    constructor(conf = {}) {
        this.rules = {};
        this.addRules(conf.rules || []);
    }

    compile(schema, parentContext) {
        const validator = new Validator(this, schema, parentContext);

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
