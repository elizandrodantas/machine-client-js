const { Protocol } = require('./protocol')
const { test } = require('node:test')
const assert = require('node:assert')
const { encrypt, decrypt } = require('./cipher')

const key = Buffer.from(new Uint8Array(16))
const iv = Buffer.from(new Uint8Array(16))
const machineId = "machine-id-test"
const machineName = "test"
const json = JSON.stringify({
    machine_id: machineId,
    machine_name: machineName,
    machine_plataform: process.env?.OS || "OK",
    expire: 1686951958
})
const protocolResult = "AAAAAAAAAAAAAAAAAAAAAB3LJrWM4kVV7ROTPegOCUM5gZSnlBsdCFJSaTLXk2d2IeW7rQjfzfesRqPUFJDEWoPw2d9rZ3tOlp7hlvrunpBMY2VAKBzmtwKzlPu5/c+Pvj79V0WsBV8eBszVu6aqyLvoRbOR2wRYWklZAAAAAAAAAAAAAAAAAAAAAA=="

test('test encrypt ctr', () => {
    const enc = encrypt("test", key, iv)
    const encode64 = enc.toString('base64')

    assert.equal(encode64, "Eow4oA==")
})

test('test decrypt ctr', () => {
    const decode64 = Buffer.from('Eow4oA==', 'base64')
    const dec = decrypt(decode64, key, iv)
    
    assert.equal(dec, "test")
})

test('test import encryped in protocol', () => {
    const enc = encrypt(json, key, iv)

    const controller = new Protocol(
        Buffer.concat([ iv, enc, key ])
    )

    assert.equal(controller.toBase64(), protocolResult)
    assert.equal(controller.getIv().length, 16)
    assert.equal(controller.getKey().length, 16)
    assert.equal(controller.getMessage().length, 107)
})

test('test export decrypted value from protocol', () => {
    const controller = new Protocol(
        Buffer.from(protocolResult, 'base64')
    )

    const dec = decrypt(controller.getMessage(), controller.getKey(), controller.getIv())
    
    assert.equal(dec, json)
    assert.equal(controller.getIv().length, 16)
    assert.equal(controller.getKey().length, 16)
    assert.equal(controller.getMessage().length, 107)
})