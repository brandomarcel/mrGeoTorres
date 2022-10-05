import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { NgForm } from '@angular/forms';
import { AlertController } from '@ionic/angular';
import { AthenticationService } from '../../services/athentication.service';
import { Router } from '@angular/router';
import { FirestoreService } from '../../services/firestore.service';
import { Socio } from '../../Models/Socio';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { Alerts } from '../../Models/Alerts';
import { Swalls } from '../../Models/Swals';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-registro',
  templateUrl: './registro.page.html',
  styleUrls: ['./registro.page.scss'],
})
export class RegistroPage implements OnInit {
  alerts: Alerts;
  swalls: Swalls;
  encryptdecript: EncriptDecript;
  usuario: Usuario;
  confirma: string;
  password: string;
  socio: Socio;
  private subscriptions = new Subscription();

  constructor( public alertctrl: AlertController,
               private auth: AthenticationService,
               private router: Router,
               private firestore: FirestoreService) {
this.usuario = new Usuario();
this.alerts = new Alerts();
this.swalls = new Swalls();
this.encryptdecript = new EncriptDecript();
  }

  ngOnInit() {
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }


  loginSubmited(form: NgForm){
    let mensajeError = '';
    if (!form.control.valid){
      this.alerts.presentAlert(this.alertctrl, 'Error:', 'Campos Incorrectos...', 'alertConfirm');
    }else{
          if (this.usuario.validarCedula(this.usuario.cedula)){
            this.swalls.presentSwall('Registrando:', 'Registrando Nuevo Usuario', 'info');
            this.swalls.presentLoading();
            this.validarDatosUsuario(this.usuario).then(res => {
              if (res[0]){
                this.subscriptions.add( this.auth.nuevoUsuario(this.usuario, this.password).subscribe( (resp: any) => {
                 this.usuario.id = resp.localId;
                 localStorage.setItem('userId', this.encryptdecript.EncriptarSimple(this.usuario.id, llaveEncrypt.llaveEncrypt));
                 this.usuario.rol = 'U';
                 this.usuario.toMayusculas();
                 this.usuario.estado ="D"
                 this.firestore.UsuarioNuevo(this.usuario)
                 .then(() => {
                 })
                 .catch((err) => {
                 });
                 this.swalls.cerrarSwall();
                 this.swalls.presentSwall('Exito:', 'Usuario Registrado con éxito...', 'success');
                 res[1].estado = 'O';
                 this.firestore.ActualizarEstadoSocio(res[1], res[2]);
                 this.usuario.VaciarUsuario();
                 this.password = '';
                 this.confirma = '';
                 this.router.navigateByUrl('/sigeo/noticias');
                }, (err) => {
                   const error = err.error.error.message;
                   switch (error) {
                     case 'EMAIL_EXISTS':
                       mensajeError = 'Este correo electrónico ya se encuentra asociado a una cuenta...';
                       break;
                     default:
                       mensajeError = 'Error Desconocido...';
                       break;
                   }

                   this.swalls.presentSwall('Error:', mensajeError, 'error');
                 }));
               }else{
                 this.swalls.presentSwall('Error:', 'Cedula y código no coinciden, o ya existe una cuenta con el codigo ingresado',
                                          'error');
               }
            });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error:', 'La cédula no es correcta', 'alertConfirm');
    }
    }
}


validarDatosUsuario(usuario: Usuario){
  const data: Array<any> = new Array<any>();
  return this.firestore.VerificarSocio(usuario.codigo).toPromise()
    .then(function(resp) {
      if (resp.docs.length > 0){
        resp.forEach(function(doc){
          if (usuario.cedula === doc.data().cedula){
            if (doc.data().estado === 'D'){
            data[0] = true;
            data[1] = doc.data();
            data[2] = doc.id;
            }else{
              data[0] = false;
            }
          }else{
            data[0] = false;
          }
        });
        return data;
      } else {
        data[0] = false;
        return data;
      }
    })
    .catch (
    function(error) {
      data[0] = false;
      return data;
    }
    );
}


}
