/* eslint-disable no-param-reassign */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const { isArray, isString, toArray, isObject, uniqueIdenticFilter } = require('myrmidon');
const rules = require('../lib/rules').default;

const RULES = new Map();

rules.forEach(r => RULES.set(r.name, r.schema));

module.exports = {
    onSection(section) {
        const values = section.values[0];
        const schema = RULES.get(values.name);

        if (schema) {
            if (isArray(schema)) {
                values.id = schema[0];
                values.alias = schema.slice(1);
            } else if (isString(schema)) {
                values.id = schema;
            } else {
                throw new Error(`Rule ${values.name} not found`);
            }

            if (values.tags.depends) values.tags.depends = toArray(values.tags.depends);
        }
    },
    filterExamples(values, cases) {
        const schemas = toArray(RULES.get(values.name));
        const examples = cases
            .filter(c => schemas.some(s => {
                const rs = c.examples[0].rules;

                if (isString(rs)) return s === rs;
                if (isObject(rs)) return s === Object.keys(rs)[0];

                return false;
            }
            ));

        // eslint-disable-next-line unicorn/no-array-callback-reference
        return { examples, testFiles: examples.map(e => e.file).filter(uniqueIdenticFilter) };
    },
    handlebars(HandleBars) {
        HandleBars.registerHelper('json', json => {
            return JSON.stringify(json);
        });
    }
};
