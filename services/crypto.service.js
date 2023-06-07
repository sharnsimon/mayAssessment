const cryptoJS = require('crypto-js')
require('../config/config')

const encrypt = async function(plaintext){
    let ciphertext;
    ciphertext = cryptoJS.AES.encrypt(plaintext.toString(),CONFIG.secret_key).toString()
    return ciphertext
}

module.exports.encrypt = encrypt

const decrypt = async function(ciphertext){
    let plaintext;
    let bytes = cryptoJS.AES.decrypt(ciphertext.toString(),CONFIG.secret_key)
    plaintext = bytes.toString(cryptoJS.enc.Utf8)
    return plaintext
}
module.exports.decrypt =decrypt