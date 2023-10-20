import Base from './Base';
/**
 * @error
 */
export default class NotDateError extends Base {
    message = 'The value is not a valid date';
    code = 'NOT_DATE';
}
