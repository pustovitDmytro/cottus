import { ASCII_RANGES } from './constants';

export function isASCII(type, code) {
    const { min, max } = ASCII_RANGES[type];

    return code <= max && code >= min;
}
