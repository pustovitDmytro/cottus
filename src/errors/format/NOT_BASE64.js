import Base from './Base';
/**
 * @error
 */
export default class NotStringError extends Base {
    message = 'The value is not a valid base64 encoded string';
    code = 'NOT_BASE64';
}
