import Base from './Base';
/**
 * @error
 */
export default class NotUUIDError extends Base {
    message = 'The value is not a valid UUID v4';
    code = 'NOT_UUID';
}
