import Base from './Base';

export default class HighError extends Base {
    message = 'The number is higher than the limit'
    code = 'TOO_HIGH'
    get params() {
        return { limit: this.payload };
    }
}
