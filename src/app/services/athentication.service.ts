import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Usuario } from '../Models/Usuario';
import { map } from 'rxjs/operators';
import { firebaseConfig, llaveEncrypt } from '../../environments/environment.prod';
import * as CryptoJS from 'crypto-js';

@Injectable({
  providedIn: 'root'
})
export class AthenticationService {
private url = 'https://identitytoolkit.googleapis.com/v1/accounts:';
private apikey = firebaseConfig.apiKey;
userToken: string;
userId: string;
  // crear nuevos usuarios
// https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=[API_KEY]
// ingresar con usuarios
// https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=[API_KEY]

  constructor(private http: HttpClient) {
    this.userToken = localStorage.getItem('token');
   }

  logOut(){
    this.userToken = null;
    localStorage.removeItem('token');
    localStorage.removeItem('userId');
    localStorage.removeItem('codigos');
    localStorage.removeItem('user');
  }

  logIn(emaillog: string, pass: string){
    const authData = {
      email: emaillog,
      password: pass,
      returnSecureToken: true
      };
    return this.http.post(
        `${ this.url }signInWithPassword?key=${this.apikey}`,
        authData
      ).pipe(
        // si encuentra un error nunca se dispara
        map(resp => {
          // tslint:disable-next-line: no-string-literal
          this.guardarToken(resp['idToken']);
          // tslint:disable-next-line: no-string-literal
          this.guardaridUser(resp['localId']);
          // debemos de poner eso para que no bloquee la respuesta
          return resp;
        })
      );
  }

  changePass(){
    
  }

  nuevoUsuario(usuario: Usuario, pass: string){
const authData = {
email: usuario.email,
password: pass,
returnSecureToken: true
};

return this.http.post(
  `${ this.url }signUp?key=${this.apikey}`,
  authData
).pipe(
  // si encuentra un error nunca se dispara
  map(resp => {
    // tslint:disable-next-line: no-string-literal
    this.guardarToken(resp['idToken']);
    // debemos de poner eso para que no bloquee la respuesta
    return resp;
  })
);
  }

  private guardarToken( idToken: string){
this.userToken = idToken;
localStorage.setItem('token', idToken);
  }

  private guardaridUser( idUser: string){
    this.userId = idUser;
    localStorage.setItem('userId', CryptoJS.AES.encrypt(idUser, llaveEncrypt.llaveEncrypt));
      }

  private leerToken(){
    if (localStorage.getItem('token')) {
      this.userToken = localStorage.getItem('token');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

  private leerUserId(){
    if (localStorage.getItem('userId')) {
      this.userToken = localStorage.getItem('userId');
    }else{
      this.userToken = '';
    }

    return this.userToken;
  }

estaAutenticado(){
  let logedIn: boolean;
  if (this.userToken === undefined || this.userToken === null){
    logedIn = false;
  }else{
    logedIn = true;
  }
  return logedIn;
}

resetPassword(emailuser: string) {
  const authData = {
    requestType: 'PASSWORD_RESET',
    email: emailuser
    };
  try{
    return this.http.post(
      `${ this.url }sendOobCode?key=${this.apikey}`,
      authData
    ).pipe(
      // si encuentra un error nunca se dispara
      map(resp => {
        // debemos de poner eso para que no bloquee la respuesta
        return resp;
      })
    );
  }catch (e){
  }
}

}


