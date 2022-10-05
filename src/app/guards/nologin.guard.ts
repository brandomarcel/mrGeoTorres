import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AthenticationService } from '../services/athentication.service';
@Injectable({
  providedIn: 'root'
})
export class NologinGuard implements CanActivate {

  constructor(private authservice: AthenticationService, private roter: Router){
  }

  canActivate(): boolean{
    if (this.authservice.estaAutenticado()) {
        this.roter.navigateByUrl('/sigeo/noticias');
        return false;
    }else{
      return true;
    }
  }
}
