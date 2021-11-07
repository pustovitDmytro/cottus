import Base from './Base';

export default class NotIntegerError extends Base {
    message = 'The number is not a valid integer'
    code = 'NOT_INTEGER'
}
