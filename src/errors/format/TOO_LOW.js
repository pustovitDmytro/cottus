import Base from './Base';

export default class LowError extends Base {
    message = 'The number is lower than the limit';
    code = 'TOO_LOW';
    get params() {
        return { limit: this.payload };
    }
}
