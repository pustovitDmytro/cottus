import Base from './Base';
/**
 * @error
 */
export default class NotIntegerError extends Base {
    message = 'The number is not a valid integer';
    code = 'NOT_INTEGER';
}
