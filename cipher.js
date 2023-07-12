const crypto = require('node:crypto');

/**
 * 
 * @param {string} plaintext 
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @return {Buffer}
 */

function encrypt(plaintext, key, iv) {
  const cipher = crypto.createCipheriv('aes-128-ctr', key, iv);
  let ciphertext = cipher.update(plaintext);
  
  return ciphertext;
}

exports.encrypt = encrypt

/**
 * 
 * @param {Buffer | string} ciphertext 
 * @param {Buffer} key 
 * @param {Buffer} iv 
 * @return {string}
 */

function decrypt(ciphertext, key, iv) {
    const decipher = crypto.createDecipheriv('aes-128-ctr', key, iv);
    let plaintext = decipher.update(ciphertext);

    return plaintext.toString("utf-8");
}

exports.decrypt = decrypt