import Base from './Base';

export default class InvalidHostError extends Base {
    message = 'Host not valid';
    code = 'INVALID_HOST';
}
