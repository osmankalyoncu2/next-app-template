// Module to decrpyt the API key and return the userId

import {
    app_database
} from '@/lib/database/connect'
import NextError from './NextError';

const crypto = require('crypto');

const ENCRYPTION_KEY = process.env.ENCRYPTION_KEY || null;
const ENCRYPTION_PREFIX = process.env.ENCRYPTION_PREFIX || "secret_";
const IV_LENGTH = 16; // For AES, this is always 16

export const decrypt = (encryptedApiKey) => {
    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
        throw new NextError('Invalid encryption key. Key must be 32 bytes.');
    }

    const parts = encryptedApiKey.split('_');
    const iv = Buffer.from(parts.shift(), 'hex');
    const encryptedText = Buffer.from(parts.join('_'), 'hex');
    const decipher = crypto.createDecipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);

    return decrypted.toString();
}

export const encrypt = (apiKey) => {
    if (!ENCRYPTION_KEY || ENCRYPTION_KEY.length !== 32) {
        throw new NextError('Invalid encryption key. Key must be 32 bytes.');
    }

    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv('aes-256-gcm', Buffer.from(ENCRYPTION_KEY), iv);
    let encrypted = cipher.update(apiKey);
    encrypted = Buffer.concat([encrypted, cipher.final()]);

    return iv.toString('hex') + '_' + encrypted.toString('hex');
}

const uuidTransform = (uuid) => {
    // if uuid has no dashes, add them
    // otherwise, remove them
    if (uuid.indexOf('-') === -1) {
        return uuid.replace(/(.{8})(.{4})(.{4})(.{4})(.{12})/, '$1-$2-$3-$4-$5');
    } else {
        return uuid.replace(/-/g, '');
    }
};

const generatePrefix = (user_id) => {
    return ENCRYPTION_PREFIX + uuidTransform(user_id) + '_';
};

const removePrefix = (apiKey) => {
    const parts = apiKey.split('_');

    if (parts.length === 2) {
        return {
            user_id: parts[0],
            secret: parts[1]
        };
    }

    // If there is a prefix
    if (parts.length === 3) {
        return {
            user_id: parts[1],
            secret: parts[2]
        };
    }

    throw new NextError('Invalid API key.');
}

export const generateApiKey = async (user_id, permissions = []) => {
    const secret = crypto.randomBytes(16).toString('hex');
    const apiKey = generatePrefix(user_id) + secret;

    const encryptedSecret = encrypt(secret);

    // Store encryptedApiKey in database
    const { error } = await app_database
        .from('keys')
        .insert({
            encrypted_key: encryptedSecret,
            user_id: user_id,
            permissions: permissions,
        })

    if (error) {
        throw new NextError('There was an error generating your API key.');
    }

    return {
        key: apiKey,
    }
}

export const whoIsApiKey = async (apiKey) => {
    const { user_id, secret } = removePrefix(apiKey);

    // find the user_id for the encrypted key
    const { data, error } = await app_database
        .from('keys')
        .select('encrypted_key')
        .eq('user_id', user_id)

    if (error) {
        throw new NextError('API key not found.');
    }

    for (const item of data) {
        const encryptedApiKey = item.encrypted_key;
        const decryptedApiKey = decrypt(encryptedApiKey);

        if (decryptedApiKey === secret) {
            return {
                user_id: uuidTransform(user_id)
            };
        }
    }

    throw new NextError('API key not found.');
}