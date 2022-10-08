import rules  from './rules';
import nodeRules from './rules/nodejs';
import BaseRule from './rules/Base';
import Cottus from './Cottus';
import ValidationError from './errors/ValidationError';
import * as errors from './errors';
import BaseError from './errors/format/Base';
import Assembler from './Assembler';

export default new Cottus({ rules: [ ...rules, ...nodeRules ] });

export const defaultRules = rules;

export {
    ValidationError,
    Cottus,
    Assembler,
    BaseRule,
    BaseError,
    errors
};
