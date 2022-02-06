import Base from './Base';

export default class LongError extends Base {
    message = 'The value is longer than the limit';
    code = 'TOO_LONG';
    get params() {
        return { limit: this.payload };
    }
}
