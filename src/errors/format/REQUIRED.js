import Base from './Base';
/**
 * @error
 */
export default class RequiredError extends Base {
    message = 'The value is required';
    code = 'REQUIRED';
}
