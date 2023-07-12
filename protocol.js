
class Protocol {
    /**
     * 
     * @param {Buffer} input 
     */

    constructor(input){
        if (!(input instanceof Buffer)){
            input = Buffer.from(input);
        }

        if (input.length < 32){
            throw new Error("protocol invalid length");
        }
        
        /** @type {Uint8Array} */
        const uint = this.bufferToUint(input);

        /** @private */
        this.iv = this.uintToBuffer(uint.slice(0, 16));
        /** @private */
        this.key = this.uintToBuffer(uint.slice(-16, uint.length));
        /** @private */
        this.message = this.uintToBuffer(uint.slice(16, uint.length - 16));
    }

    /**
     * @param {Buffer}
     * @return {Uint8Array}
     * @private
     */

    bufferToUint(a){
        return new Uint8Array(a)
    }

    /**
     * @param {Uint8Array}
     * @return {Buffer}
     * @private
     */

    uintToBuffer(a){
        return Buffer.from(a)
    }

     /**
     * 
     * @returns {Buffer}
     */

    getIv(){
        return this.iv
    }

     /**
     * 
     * @returns {Buffer}
     */

    getKey(){
        return this.key
    }

    /**
     * 
     * @returns {Buffer}
     */

    getMessage(){
        return this.message
    }

    /**
     * 
     * @returns {Buffer}
     */

    toByteArray(){
        return Buffer.concat([
            this.iv,
            this.message,
            this.key,
        ])
    }

     /**
     * 
     * @returns {string}
     */

    toBase64(){
        return this.toByteArray().toString("base64")
    }
}

exports.Protocol = Protocol