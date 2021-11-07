export default class BaseRule {
    constructor({ cottus, params, hierarchy }) {
        this.cottus = cottus;
        this.params = params;
        this.hierarchy = hierarchy;
    }

    createNestedValidator(schema, key) {
        return this.cottus.compile(schema, [ ...this.hierarchy, key ]);
    }
}
