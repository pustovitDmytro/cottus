export default class CottusFormatError extends Error {
    constructor(payload) {
        super();
        this.payload = payload;
        this.name = this.constructor.name;
    }

    get hash() {
        const hash = {
            value   : this.value,
            path    : this.path,
            code    : this.code,
            message : this.message
        };

        if (this.params) hash.payload = this.params;

        return hash;
    }

    setContext({ value, path }) {
        this.value = value;
        this.path = path;

        this.hasContext = true;
    }
}
