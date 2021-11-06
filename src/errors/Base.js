export default class CottusFormatError extends Error {
    get hash() {
        return {
            value   : this.value,
            // path    : 'user.name',
            code    : this.code,
            message : this.message
        };
    }

    setContext(value) {
        this.value = value;
    }
}
