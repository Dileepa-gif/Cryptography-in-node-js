const crypto = require('crypto');
const algorithm = 'aes-256-cbc';
const vi = Buffer.from("cf91e1d62e298431860a00e514d53027",'hex'); //crypto.randomBytes(16);

let key = '';
export const encreption = async (data) => {
    key = crypto.createHash('sha256').update(data.encreptionKey).digest('base64').substr(0, 32);
    data.name = await data.name && data.name !== '' ? encrypt(data.name).toString() : '';
    data.price = await data.price && data.price !== '' ? encrypt(data.price).toString() : '';
    return data;
};

export const decreption = async (data, type, keydata) => {
    key = crypto.createHash('sha256').update(keydata).digest('base64').substr(0, 32);
    if (await type === 'array') {
        await data.map(async(item) => {
            item.name = item.name && item.name !== '' ? decrypt(item.name) : '';
            item.price = item.price && item.price !== '' ? decrypt(item.price) : '';
        });
        return data;
    } else if (type === "object") {
        data.dataValues.name = data.dataValues.name && data.dataValues.name !== '' ? decrypt(data.dataValues.name) : '';
        data.dataValues.price = data.dataValues.price && data.dataValues.price !== '' ? decrypt(data.dataValues.price) : '';
        return data;
    } else {
        return data;
    }
};

function encrypt(text) {
    let cipher = crypto.createCipheriv(algorithm, Buffer.from(key), vi);
    let encrypted = cipher.update(text);
    encrypted = Buffer.concat([encrypted, cipher.final()]);
    return encrypted.toString('hex');
}

function decrypt(text) {
    let encryptedText = Buffer.from(text, 'hex');
    let decipher = crypto.createDecipheriv(algorithm, Buffer.from(key), vi);
    let decrypted = decipher.update(encryptedText);
    decrypted = Buffer.concat([decrypted, decipher.final()]);
    return decrypted.toString();
}