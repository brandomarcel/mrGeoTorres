import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, UrlTree, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { EncriptDecript } from '../Models/EncriptDecript';
import { Usuario } from '../Models/Usuario';
import { llaveEncrypt } from '../../environments/environment.prod';

@Injectable({
  providedIn: 'root'
})
export class RolesoperativoGuard implements CanActivate {

  encriptdecrit: EncriptDecript;
  usuario: Usuario;


  constructor(private roter: Router) {
    this.encriptdecrit = new EncriptDecript();
  }

  canActivate(): boolean{
    const decryptedDataUser  = this.encriptdecrit.DesencriptarObjeto(localStorage.getItem('user'), llaveEncrypt.llaveEncrypt);
    this.usuario = decryptedDataUser;
    if (this.usuario.rol.includes('O')){
    return true;
  }else{
    this.roter.navigateByUrl('/sigeo/noticias');
    return false;
  }
  }
}
