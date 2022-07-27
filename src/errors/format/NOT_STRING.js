import Base from './Base';
/**
 * @error
 */
export default class NotStringError extends Base {
    message = 'The value is not a string';
    code = 'NOT_STRING';
}
