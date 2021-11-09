import { NOT_BOOLEAN } from '../errors';
import Base from './Base';

const trully = new Set([ 1, 'true', true ]);
const falsy = new Set([ 0, 'false', false ]);

export default class BooleanRule extends Base {
    static schema = 'boolean';
    validate(input) {
        if (trully.has(input)) return true;
        if (falsy.has(input)) return false;

        throw new NOT_BOOLEAN();
    }
}
