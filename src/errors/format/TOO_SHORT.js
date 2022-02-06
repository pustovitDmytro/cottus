import Base from './Base';

export default class ShortError extends Base {
    message = 'The value is shorter than the limit';
    code = 'TOO_SHORT';
    get params() {
        return { limit: this.payload };
    }
}
