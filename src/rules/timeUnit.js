import { isString, isNumber } from 'myrmidon';
import { WRONG_TIME_UNIT, WRONG_FORMAT } from '../errors';
import { isASCII } from '../utils';
import NumberRule from './number';
import Base from './Base';

function parse(string) {
    const firstAlpha = [ ...string ].findIndex(char => {
        const code = char.charCodeAt(0);

        return isASCII('upperAlpha', code) || isASCII('lowerAlpha', code);
    });

    if (!~firstAlpha) {
        return {
            amount : string.trim()
        };
    }

    return {
        amount : string.slice(0, firstAlpha).trim(),
        unit   : string.slice(firstAlpha).trim().toLowerCase()
    };
}

const MS_IN_SEC = 1000;
const SEC_IN_MIN = 60;
const MS_IN_MIN = SEC_IN_MIN * MS_IN_SEC;
const MIN_IN_HOUR = 60;
const MS_IN_HOUR = MIN_IN_HOUR * MS_IN_MIN;
const HOUR_IN_DAY = 24;
const MS_IN_DAY = MS_IN_HOUR * HOUR_IN_DAY;
const DAY_IN_WEEK = 24;
const MS_IN_WEEK = MS_IN_DAY * DAY_IN_WEEK;
const DAY_IN_MONTH = 30;
const MS_IN_MONTH = MS_IN_DAY * DAY_IN_MONTH;
const DAY_IN_YEAR = 365;
const MS_IN_YEAR = MS_IN_DAY * DAY_IN_YEAR;

const defaultUnit = {
    words      : [ 'milliseconds', 'millisecond', 'msecs', 'msec', 'ms' ],
    multiplier : 1
};

const UNITS = [
    {
        words      : [ 'years', 'year', 'yrs', 'yr', 'y' ],
        multiplier : MS_IN_YEAR
    },
    {
        words      : [ 'months', 'month', 'mnth', 'mo', 'm’th', 'm-th', 'mth' ],
        multiplier : MS_IN_MONTH
    },
    {
        words      : [ 'weeks', 'week', 'w' ],
        multiplier : MS_IN_WEEK
    },
    {
        words      : [ 'days', 'day', 'd' ],
        multiplier : MS_IN_DAY
    },
    {
        words      : [ 'hours', 'hour', 'hrs', 'hr', 'h' ],
        multiplier : MS_IN_HOUR
    },
    {
        words      : [ 'minutes', 'minute', 'mins', 'min', 'm' ],
        multiplier : MS_IN_MIN
    },
    {
        words      : [ 'seconds', 'second', 'secs', 'sec', 's' ],
        multiplier : MS_IN_SEC
    },
    defaultUnit
];

function calc(amount, unitKey) {
    const unit = unitKey
        ? UNITS.find(u => u.words.includes(unitKey))
        : defaultUnit;

    if (!unit) throw new WRONG_TIME_UNIT();

    return amount * unit.multiplier;
}

export default class TimeUnitRule extends Base {
    static schema = [ 'time_unit', 'timeUnit' ];
    validate(input) {
        if (isNumber(input)) return input;

        if (isString(input)) {
            const parentRule = this.createChildRule(NumberRule);
            const { amount, unit } = parse(input);

            if (!amount) throw new WRONG_TIME_UNIT();
            const number = parentRule.validate(amount);

            return calc(number, unit);
        }

        throw new WRONG_FORMAT();
    }
}
