import { WRONG_PORT_NUMBER } from '../errors';
import Base from './Base';

export default class PortRule extends Base {
    static schema = 'port';
    static errors = {}
    alias = [
        'integer',
        { 'min': 0 },
        { 'max': 65_535 }
    ]
    static defaultError = WRONG_PORT_NUMBER
}
