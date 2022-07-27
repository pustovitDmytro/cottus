import Base from './Base';
/**
 * @error
 */
export default class WrongFormatError extends Base {
    message = 'Format not supported';
    code = 'WRONG_FORMAT';
}
