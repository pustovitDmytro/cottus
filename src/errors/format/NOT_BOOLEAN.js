import Base from './Base';

export default class NotBooleanError extends Base {
    message = 'The value is not a boolean or could not be cast to a boolean';
    code = 'NOT_BOOLEAN';
}
