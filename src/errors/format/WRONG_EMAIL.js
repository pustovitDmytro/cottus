import Base from './Base';
/**
 * @error
 */
export default class WrongEmailError extends Base {
    message = 'The value is not a valid rfc5322 email format';
    code = 'WRONG_EMAIL';
}
