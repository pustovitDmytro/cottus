import Base from './Base';
/**
 * @error
 */
export default class NotObjectError extends Base {
    message = 'The value have to be plain js object';
    code = 'NOT_OBJECT';
}
