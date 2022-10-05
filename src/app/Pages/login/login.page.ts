import { Component, OnInit, OnDestroy } from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { NgForm } from '@angular/forms';
import { AthenticationService } from '../../services/athentication.service';
import Swal from 'sweetalert2';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { Slides } from '../../Models/Slides';
import {Alerts} from '../../Models/Alerts';
import { Swalls } from '../../Models/Swals';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { AlertController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
})

export class LoginPage implements OnInit {

  private subscriptions = new Subscription();
  slidesprops: Slides;
  slideopts: any;
  usuario: Usuario;
  clave: string;
  recordarme = false;
  alertas: Alerts;
  swals: Swalls;
  encript: EncriptDecript;
  showPass = false;

  constructor( private alertctrl: AlertController,
               private auth: AthenticationService,
               private router: Router ) {
    this.usuario = new Usuario();
    this.slidesprops = new Slides();
    this.slideopts = this.slidesprops.optslides;
    this.alertas = new Alerts();
    this.swals = new Swalls();
    this.encript = new EncriptDecript();
  }

  ngOnInit() {
  }

  ionViewWillEnter(){
    this.RecordarUsuario();
  }

  private RecordarUsuario() {
    if (localStorage.getItem('email')) {
      const dataemail = this.encript.DesencriptarSimple(localStorage.getItem('email'), llaveEncrypt.llaveEncrypt);
      this.usuario.email = dataemail;
      this.clave = '';
      this.recordarme = true;
    }
    else {
      this.usuario = new Usuario();
      this.clave = '';
    }
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ShowPass(){
    this.showPass = !this.showPass;
  }


  loginSubmited(form: NgForm){
    let mensajeError = '';
    if (form.invalid){
      this.alertas.presentAlert(this.alertctrl, 'Error de Inicio de Sesión', 'datos no válidos...', 'alertConfirm');
      }else{
        this.swals.presentSwall('Iniciando Sesión...', 'Cargando porfavor Espere...', 'info' );
        this.swals.presentLoading();
        
        this.subscriptions.add(this.auth.logIn(this.usuario.email, this.clave).subscribe( resp => {
            this.swals.cerrarSwall();
            if (this.recordarme) {
              localStorage.setItem('email', this.encript.EncriptarSimple(this.usuario.email, llaveEncrypt.llaveEncrypt));
            }else{
              localStorage.removeItem('email');
            }
            this.router.navigateByUrl('/sigeo/noticias');
            }, (err) => {
              if (err.error?.error) {
              const error = err.error?.error.message;
              switch (error) {
                case 'EMAIL_NOT_FOUND':
                  mensajeError = 'No se econtró ninguna cuenta con el correo ingresado';
                  break;
                  case 'INVALID_PASSWORD':
                    mensajeError = 'Contraseña Incorrecta';
                    break;
                  case 'USER_DISABLED':
                    mensajeError = 'Cuenta inhabilitada contáctese con los administradores';
                    break;
                default:
                  mensajeError = 'Error desconocido...';
                  break;

                  case 'TOO_MANY_ATTEMPTS_TRY_LATER : Too many unsuccessful login attempts. Please try again later.':
                    mensajeError = 'Varios intentos de inicio de sesión fallidos, intentelo mas tarde';
              }
              this.swals.presentSwall('Error', mensajeError, 'error');
            } else {
                this.swals.cerrarSwall();
                //this.router.navigateByUrl('/no-internet');
              }
            })
            );
      }
}

resetpass(){
  Swal.fire({
    title: 'Ingresa Tu Correo Electrónico',
    input: 'text',
    background: 'rgb(225,230,231)',
    inputAttributes: {
      autocapitalize: 'off'
    },
    backdrop: false,
    showCancelButton: true,
    confirmButtonText: 'Aceptar',
    showLoaderOnConfirm: true,
    preConfirm: (email) => {
      this.auth.resetPassword(email).subscribe({
        error(err) {
          Swal.fire({
            icon: 'error',
            title: `Cuenta no encontrada:`,
            html: `"${email}"`,
            background: 'rgb(225,230,231)',
            showConfirmButton: true,
            backdrop: false
          });
         },
        complete() {
          Swal.fire({
            icon: 'success',
            title: `Enlace eviado al correo:`,
            html: `<h3>"${email}"</h3>`,
            background: 'rgb(225,230,231)',
            showConfirmButton: true,
            backdrop: false
          });
         }
      });
    },
  } );
}

}
