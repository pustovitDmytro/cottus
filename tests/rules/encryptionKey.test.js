/* eslint-disable no-param-reassign */
import crypto from 'crypto';
import { promisify } from 'util';
import { RuleTester } from '../utils';

const tester = new RuleTester('encryption_key');

suite('Rules: encryptionKey #no-pack #skip-example');

const keys = {};

// eslint-disable-next-line node/no-unsupported-features/node-builtins
const generateKeyPair = promisify(crypto.generateKeyPair);

async function addKeys(type, keyTypes, accum, passphrase) {
    const extra = passphrase
        ? {}
        : { passphrase, cipher: passphrase };
    const { publicKey, privateKey } = await generateKeyPair(type, {
        modulusLength      : 2048,
        privateKeyEncoding : {
            type   : keyTypes.private,
            format : 'pem',
            ...extra
        },
        publicKeyEncoding : {
            type   : keyTypes.public,
            format : 'pem'
        }
    });

    accum[`private-${type}-${keyTypes.private}${passphrase ? 'passphrase' : ''}`] = privateKey;
    accum[`public-${type}-${keyTypes.public}`] = publicKey;
}

before(async function ()  {
    await addKeys('rsa', { public: 'pkcs1', private: 'pkcs1' }, keys);
    await addKeys('rsa-pss', { public: 'spki', private: 'pkcs8' }, keys);
    await addKeys('rsa', { public: 'spki', private: 'pkcs8' }, keys, 'UUkSHZlu');
    await addKeys('dsa', { public: 'spki', private: 'pkcs8' }, keys);
});

test('Positive: crypto keyPairs', async function () {
    Object.entries(keys).forEach(([ comment, key ]) => {
        tester.positive(key, key, comment);
    });
});

test('Positive: empty value', function () {
    tester.positive(null, null);
    tester.positive(undefined, undefined);
});

test('Negative: bad header/footer', function () {
    tester.negative('kldkfldskf', 'BAD_ENCRYPTION_HEADER', 'Key header invalid');
    tester.negative('-----BEGIN PRIVATE KEY-----', 'BAD_ENCRYPTION_FOOTER', 'Key footer invalid');
});

test('Negative: bad payload', function () {
    tester.negative('-----BEGIN PRIVATE KEY-----\n]][p]p\n]erw]e\n-----END PRIVATE KEY-----', 'NOT_BASE64', 'The value is not a valid base64 encoded string');
});
