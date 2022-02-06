import Base from './Base';

export default class WrongTimeUnitError extends Base {
    message = 'The value can not be parsed as time unit';
    code = 'WRONG_TIME_UNIT';
}
