import Base from './Base';
/**
 * @error
 */
export default class NotAllowedError extends Base {
    message = 'The value is not allowed';
    code = 'NOT_ALLOWED_VALUE';
}
