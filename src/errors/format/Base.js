export default class CottusFormatError extends Error {
    constructor(payload) {
        super();
        this.payload = payload;
        this.name = this.constructor.name;
    }

    get hash() {
        return {
            value   : this.value,
            path    : this.path,
            code    : this.code,
            message : this.message
        };
    }

    setContext({ value, path }) {
        this.value = value;
        this.path = path;

        this.hasContext = true;
    }
}
