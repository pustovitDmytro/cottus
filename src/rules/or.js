import { last } from 'myrmidon';
import Base from './Base';

/**
 * Checks value to match one of following rules. throws last failed rule, if none matched.
 * @param {array} rules list of rules to check
 * @returns {any} valid input
 * @rule
 */
export default class OrRule extends Base {
    static schema = 'or';

    validate(input) {
        const errors = [];

        for (const schema of this.params) {
            const validator = this.createValidator(schema);

            try {
                return validator.validate(input);
            } catch (error) {
                errors.push(error);
            }
        }

        throw last(errors);
    }
}
