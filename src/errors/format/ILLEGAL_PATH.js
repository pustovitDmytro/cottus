import Base from './Base';

export default class IllegalPathError extends Base {
    message = 'string can not be used as legal file path';
    code = 'ILLEGAL_PATH';
}
