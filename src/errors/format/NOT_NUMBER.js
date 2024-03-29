import Base from './Base';
/**
 * @error
 */
export default class NotNumberError extends Base {
    message = 'The value is not a number or could not be cast to a number';
    code = 'NOT_NUMBER';
}
