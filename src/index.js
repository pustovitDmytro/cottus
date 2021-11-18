import rules  from './rules';
import nodeRules from './rules/nodejs';
import Cottus from './Cottus';
import ValidationError from './errors/ValidationError';
import Assembler from './Assembler';

export default new Cottus({ rules: [ ...rules, ...nodeRules ] });

export const defaultRules = rules;

export {
    ValidationError,
    Cottus,
    Assembler
};
