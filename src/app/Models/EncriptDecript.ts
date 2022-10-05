import * as CryptoJS from 'crypto-js';

export class EncriptDecript {

    EncriptarSimple(mensaje: string, llave: string){
        return CryptoJS.AES.encrypt(mensaje, llave);
    }

    DesencriptarSimple(mensaje: string, llave: string){
       const desencript = CryptoJS.AES.decrypt(mensaje, llave);
       return desencript.toString(CryptoJS.enc.Utf8);

    }

    DesencriptarObjeto(object: any, llave: string){
      const decrypt = CryptoJS.AES.decrypt(object, llave);
      return JSON.parse(decrypt.toString(CryptoJS.enc.Utf8));
}
    EncriptarObjeto(objeto: any, llave: string){
        return CryptoJS.AES.encrypt(JSON.stringify(objeto), llave).toString();
    }
}