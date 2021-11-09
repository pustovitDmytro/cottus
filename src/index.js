import rules  from './rules';
import nodeRules from './rules/nodejs';
import Cottus from './Cottus';
import ValidationError from './errors/ValidationError';

export default new Cottus({ rules: [ ...rules, ...nodeRules ] });

export const defaultRules = rules;

export {
    ValidationError
};
