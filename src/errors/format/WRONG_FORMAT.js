import Base from './Base';

export default class WrongFormatError extends Base {
    message = 'Format not supported';
    code = 'WRONG_FORMAT';
}
