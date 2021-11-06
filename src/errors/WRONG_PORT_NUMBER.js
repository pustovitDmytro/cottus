import Base from './Base';

export default class PortError extends Base {
    message = "The number didn't look like a valid TCP port number [0, 65535]"
    code = 'WRONG_PORT_NUMBER'
}
