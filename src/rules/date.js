import { NOT_DATE } from '../errors';
import Base from './Base';

/**
 * Checks value to be a valid date.
 * @param {string} input value in the Date time string format
 * @error NOT_ALLOWED_VALUE
 * @returns {date} valid date
 * @rule
 */
export default class DateRule extends Base {
    static schema = 'date';

    validate(input) {
        const date = new Date(input);

        if (Number.isNaN(date.getTime())) throw new NOT_DATE();

        return date;
    }
}
