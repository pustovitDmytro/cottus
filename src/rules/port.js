import { WRONG_PORT_NUMBER, NOT_NUMBER } from '../errors';
import Base from './Base';

/**
 * Checks value to be a valid port number.
 * @depends integer
 * @error NOT_NUMBER
 * @error WRONG_PORT_NUMBER
 * @returns {any} valid port number
 * @rule
 */
export default class PortRule extends Base {
    static schema = 'port';
    static errors = [ NOT_NUMBER ];
    alias = [
        'integer',
        { 'min': 0 },
        { 'max': 65_535 }
    ];
    static defaultError = () => new WRONG_PORT_NUMBER();
}
