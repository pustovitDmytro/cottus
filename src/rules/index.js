import required from './required';
import port from './port';
import attributes from './attributes';
import every from './every';
import integer from './integer';
import number from './number';
import min from './min';
import max from './max';
import string from './string';
import base64 from './base64';
import encryptionKey from './encryptionKey';
import boolean from './boolean';
import email from './email';
import uuid from './uuid';
import enumRule from './enum';
import defaultValueRule from './default';
import timeUnit from './timeUnit';
import cron from './cron';
import or from './or';
import toLower from './toLower';
import date from './date';

export default [
    required,
    port, integer, number,
    attributes, every,
    min, max,
    string,
    base64, encryptionKey,
    boolean,
    email,
    uuid,
    enumRule,
    defaultValueRule,
    timeUnit,
    cron,
    or,
    toLower,
    date
];
