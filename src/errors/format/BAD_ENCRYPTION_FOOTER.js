import Base from './Base';

export default class BadEncryptionHeaderError extends Base {
    message = 'Key footer invalid'
    code = 'BAD_ENCRYPTION_FOOTER'
}
