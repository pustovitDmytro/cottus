import Base from './Base';

export default class InvalidUrlError extends Base {
    message = 'The value is invalid URL'
    code = 'INVALID_URL'
}
