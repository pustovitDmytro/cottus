import Base from './Base';

/**
 * @error
 */
export default class BadEncryptionFooterError extends Base {
    message = 'Key footer invalid';
    code = 'BAD_ENCRYPTION_FOOTER';
}
