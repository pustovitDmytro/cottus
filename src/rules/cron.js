import { INVALID_CRON } from '../errors';
import ValidationError from '../errors/ValidationError';
import Base from './Base';
import StringRule from './string';

function parse(string) {
    const values = [];
    const ranges = [];

    for (const variant of string.split(',')) {
        const [ ranged, step, ...rest ] = variant.split('/');

        if (!ranged || rest.length > 0) throw new INVALID_CRON('INVALID_RANGE');
        if (step) ranges.push(step);
        if (ranged === '*') continue;
        values.push(...ranged.split('-'));
    }

    return { values, ranges };
}

function parseAll([ minute, hour, dayOfMonth, month, dayOfWeek, ...raw ]) {
    if (raw.length > 0) throw new INVALID_CRON('EXCESSIVE_PART');
    const res = { ranges: [] };

    Object.entries({ minute, hour, dayOfMonth, month, dayOfWeek })
        .forEach(([ key, value ]) => {
            if (!value) throw new INVALID_CRON({ key: 'REQUIRED' });
            const { values, ranges } = parse(value);

            res[key] = values;
            res.ranges.push(...ranges);
        });

    return res;
}

const monthList = [ 'jan', 'feb', 'mar', 'apr', 'ma', 'jun', 'jul', 'aug', 'sep', 'oct', 'nov', 'dec' ];
const dayOfWeekList = [ 'mon', 'tue', 'wed', 'thu', 'fri', 'sat', 'sun' ];

const rules = {
    ranges     : { every: [ 'integer', { min: 1 } ] },
    minute     : { every: [ 'integer', { min: 0 }, { max: 59 } ] },
    hour       : { every: [ 'integer', { min: 0 }, { max: 23 } ] },
    dayOfMonth : { every: [ 'integer', { min: 1 }, { max: 31 } ] },
    month      : { every : { or : [
        [ 'integer', { min: 1 }, { max: 12 } ],
        [ 'to_lower', { enum: monthList } ]
    ] } },
    dayOfWeek : { every : { or : [
        [ 'integer', { min: 0 }, { max: 6 } ],
        [ 'to_lower', { enum: dayOfWeekList } ]
    ] } }
};

export default class CronRule extends Base {
    static schema = 'cron';

    validate(input) {
        const parentRule = this.createChildRule(StringRule);
        const string = parentRule.validate(input);

        const raw = string.trim().split(/\s+/);
        const toCheck = parseAll(raw);
        const validator = this.createNestedValidator({ attributes: rules });

        try {
            validator.validate(toCheck);
        } catch (error) {
            if (error instanceof ValidationError) {
                throw new INVALID_CRON(error);
            }

            throw error;
        }

        return raw.join(' ');
    }
}
