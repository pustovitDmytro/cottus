import { setProp } from '../utils';
import ValidationError from './ValidationError';

export default class CottusAssemblerError extends ValidationError {
    get prettify() {
        const prettty = {};

        for (const error of this.errors) {
            const formatError = error.error.errors[0];
            const message = `${formatError.code}: ${formatError.message}`;

            setProp(
                prettty,
                error.path.join('.'),
                message
            );
        }

        return JSON.stringify(prettty, null, 2);
    }

    isAssemblerError = true;
}
