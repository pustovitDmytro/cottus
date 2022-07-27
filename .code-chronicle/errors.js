/* eslint-disable no-param-reassign */
/* eslint-disable import/no-commonjs */
/* eslint-disable import/unambiguous */
const errors = require('../lib/errors');

const Errors = Object.values(errors);

module.exports = {
    onSection(section) {
        const values = section.values[0];
        const errorClassName = values.name;
        const Error = Errors.find(e => e.name === errorClassName);

        if (Error) {
            const e = new Error();

            values.id = e.code;
            values.description = e.message;
        }
    }
};
