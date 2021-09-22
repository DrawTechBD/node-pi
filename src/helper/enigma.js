const crypto = require('crypto');
const algorithm = "aes-256-cbc";
const ENCRYPTION_KEY = process.env.JWT_TOKEN;
const IV_LENGTH = 16;

module.exports = {
    encrypt: (text) => {
        const iv = crypto.randomBytes(IV_LENGTH);
        const cipher = crypto.createCipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        const encrypted = Buffer.concat([cipher.update(text), cipher.final()]);
        return iv.toString('hex')+":"+encrypted.toString('hex');
    },
    decrypt: (text) => {
        const textParts = text.split(":");
        const iv = Buffer.from(textParts.shift(), 'hex');
        const encryptedText = Buffer.from(textParts.join(":"), 'hex');
        const decipher = crypto.createDecipheriv(algorithm, Buffer.from(ENCRYPTION_KEY), iv);
        const decrypted = Buffer.concat([decipher.update(encryptedText), decipher.final()]);
        return decrypted.toString();
    }
}

