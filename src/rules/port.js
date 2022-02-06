import { WRONG_PORT_NUMBER, NOT_NUMBER } from '../errors';
import Base from './Base';

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
