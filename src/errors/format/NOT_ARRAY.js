import Base from './Base';

export default class NotArrayError extends Base {
    message = 'The value have to be plain js array';
    code = 'NOT_ARRAY';
}
