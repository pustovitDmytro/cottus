import Base from './Base';
/**
 * @error
 */
export default class InvalidCronError extends Base {
    message = 'The value can not be parsed as cron string';
    code = 'INVALID_CRON';
}
