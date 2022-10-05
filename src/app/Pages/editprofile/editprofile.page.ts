import { Component, OnInit } from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { ToastController, AlertController, LoadingController } from '@ionic/angular';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { NgForm } from '@angular/forms';
import { Slides } from '../../Models/Slides';
import { Alerts } from '../../Models/Alerts';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { Loadings } from '../../Models/Loadings';
import { AthenticationService } from '../../services/athentication.service';
import Swal, { SweetAlertIcon } from 'sweetalert2';

@Component({
  selector: 'app-editprofile',
  templateUrl: './editprofile.page.html',
  styleUrls: ['./editprofile.page.scss'],
})

export class EditprofilePage implements OnInit {
usuario: Usuario;
editar: boolean;
idUser: string;
slidesprops: Slides;
slideOptsOne: any;
alerts: Alerts;
encryptdecrypt: EncriptDecript;
loadings: Loadings;

  constructor( private firestore: FirestoreService, private toastController: ToastController,
               private alertctrl: AlertController, private loadingctrl: LoadingController,
               private auth: AthenticationService) {
    this.usuario = new Usuario();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.encryptdecrypt = new EncriptDecript();
    this.loadings = new Loadings(loadingctrl);
   }


   ionViewWillEnter(){
    const decryptedDataUser  = this.encryptdecrypt.DesencriptarObjeto(localStorage.getItem('user'), llaveEncrypt.llaveEncrypt);
    this.usuario = decryptedDataUser;
   }

  ngOnInit() {
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  editSubmited(form: NgForm){
    if (form.control.valid){
    this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
    this.presentToast('Actualizando Datos...');
    const dataeuserid = this.encryptdecrypt.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
    this.idUser = dataeuserid;
    this.usuario.nombre = this.usuario.nombre.toLocaleUpperCase();
    this.usuario.apellido = this.usuario.apellido.toLocaleUpperCase();
    this.usuario.genero = this.usuario.genero.toLocaleUpperCase();
    this.firestore.ActualizarDataUsuario(this.usuario, this.idUser)
    .then(() => {
      this.loadings.CerrarLoading();
      this.presentToast('Datos actualizados con éxito :)');
    })
    .catch(() => {
      this.loadings.CerrarLoading();
      this.presentToast('Error Datos no Actualizados :(');
    });
  });
    this.editar = false;
  } else {
    this.alerts.presentAlert(this.alertctrl, 'Error:', 'Campos Incorrectos...');
  }
}

resetpass(){
      this.auth.resetPassword(this.usuario.email).subscribe({
        error(err) {
          Swal.fire({
            icon: 'error',
            title: `Cuenta no encontrada con el correo del usuario`,
            // html: `"${this.usuario.email}"`,
            background: 'rgb(225,230,231)',
            showConfirmButton: true,
            backdrop: false
          });
         },
        complete() {
          Swal.fire({
            icon: 'success',
            title: `Estimado usuario se ha enviado un enlace al correo electrónico`,
            // html: `<h3>"${this.usuario.email}"</h3>`,
            background: 'rgb(225,230,231)',
            showConfirmButton: true,
            backdrop: false
          });
         }
  } );
}

}
