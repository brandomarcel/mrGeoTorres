import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AthenticationService } from '../services/athentication.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authservice: AthenticationService, private roter: Router){
  }
  canActivate(): boolean{
    if (this.authservice.estaAutenticado()) {
      return true;
    }else{
this.roter.navigateByUrl('/login');
return false;
    }

  }
}
