const crypto = require('crypto')

const DADOS_CRIPTOGRAFAR = {
    algoritmo: "aes256",
    segredo: "chavePasS",
    tipo: "hex"
}

function criptograph(senha) {
    try {
        const cipher = crypto.createCipher(DADOS_CRIPTOGRAFAR.algoritmo, DADOS_CRIPTOGRAFAR.segredo)
        cipher.update(senha)
        return cipher.final(DADOS_CRIPTOGRAFAR.tipo)
    } catch (error) {
        console.log(error);
    }

}

module.exports = criptograph
