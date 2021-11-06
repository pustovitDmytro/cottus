import rules  from './rules';
import Cottus from './Cottus';
import ValidationError from './errors/ValidationError';

export default new Cottus({ rules });

export const defaultRules = rules;

export {
    ValidationError
};
