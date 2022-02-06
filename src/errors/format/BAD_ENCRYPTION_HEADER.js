import Base from './Base';

export default class BadEncryptionHeaderError extends Base {
    message = 'Key header invalid';
    code = 'BAD_ENCRYPTION_HEADER';
}
