import Base from './Base';

export default class RequiredError extends Base {
    message = 'The value is required'
    code = 'REQUIRED'
}
