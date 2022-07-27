import Base from './Base';
/**
 * @error
 */
export default class InvalidHostError extends Base {
    message = 'Host not valid';
    code = 'INVALID_HOST';
}
