const { customAlphabet } = require ('nanoid');

const alphabet =
'0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
const nanoid = customAlphabet (alphabet, 7);

function generateShortCode(){
    return nanoid();
}

module.exports = generateShortCode;