import { Component, OnInit } from '@angular/core';
import { Slides } from '../../Models/Slides';
import { NgForm } from '@angular/forms';
import { Usuario } from '../../Models/Usuario';
import { AlertController, LoadingController } from '@ionic/angular';
import { Alerts } from '../../Models/Alerts';
import { Loadings } from '../../Models/Loadings';
import { FirestoreService } from '../../services/firestore.service';
import { EmailComposer } from '@ionic-native/email-composer/ngx';
import { AthenticationService } from '../../services/athentication.service';
import { Subscription } from 'rxjs';
import { EmailService } from '../../services/email.service';

@Component({
  selector: 'app-ingresar-empleado',
  templateUrl: './ingresar-empleado.page.html',
  styleUrls: ['./ingresar-empleado.page.scss'],
})
export class IngresarEmpleadoPage implements OnInit {

  socio: boolean;
  slidesprops: Slides;
  slideOptsOne: any;
  usuario: Usuario;
  usuarionuevo: Usuario;
  rolarray: string[];
  alerts: Alerts;
  loadings: Loadings;
  nuevorol: string;
  private subscriptions = new Subscription();

  constructor(private alertctrl: AlertController, private firestore: FirestoreService,
              private loadingctrl: LoadingController, private auth: AthenticationService,
              private emailservice: EmailService) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.usuario = new Usuario();
    this.usuarionuevo = new Usuario();
    this.rolarray = new Array<string>();
    this.alerts = new Alerts();
    this.loadings = new Loadings(loadingctrl);
    this.nuevorol = 'U';
   }

   OnDestroy() {
    this.subscriptions.unsubscribe();
  }

   async presentAlertCheckbox() {
    const alert = await this.alertctrl.create({
      header: 'Tipos de Empleados',
      inputs: [
        {
          name: 'administrador',
          type: 'checkbox',
          label: 'Administrador',
          value: 'A'
        },

        {
          name: 'tecnico',
          type: 'checkbox',
          label: 'Técnico',
          value: 'T'
        },

        {
          name: 'operativo',
          type: 'checkbox',
          label: 'Operativo',
          value: 'O'
        },
      ],
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: () => {
          }
        }, {
          text: 'Aceptar',
          handler: (data) => {
            this.rolarray = data;
          }
        }
      ]
    });

    await alert.present();
  }

  ngOnInit() {
    this.socio = true;
  }

  segmentChanged(ev: any) {
    if (ev.detail.value === 'nosocio'){
        this.socio = false;
    }else{
        this.socio = true;
    }
  }

  verrol(){
    console.log(this.rolarray);
    
  }

  onChange(val){
    console.log("Selected:",val);
  }

  generaClave() {
    let result = '';
    const characters = 'ABCDEFGHJKMNPQRSTUVWXYZabcdefghijklmnpqrstuvwxyz123456789';
    const charactersLength = characters.length;
    for (let i = 0; i < 6; i++) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }

    return result;
}

  empleadoSubmited(form: NgForm){
    this.nuevorol = 'U';
    if (form.control.valid && (this.rolarray !== undefined && this.rolarray !== null && this.rolarray.length !== 0)){
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      this.firestore.ObtenerIdUsuarioByCodigo(parseInt(this.usuario.codigo)).toPromise()
      .then((resp: any) => {
        if (resp.docs[0]){
          const userid = resp.docs[0].id;
          this.usuarionuevo = resp.docs[0].data();
          for (let index = 0; index < this.rolarray.length; index++) {
            this.nuevorol += this.rolarray[index].toString();
          }
          this.usuarionuevo.rol = this.nuevorol;
          this.usuarionuevo.estado = 'D';
          this.firestore.ActualizarDataUsuario(this.usuarionuevo, userid)
          .then(() => {
            this.loadings.CerrarLoading();
            this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Empleado registrado con éxito', 'alertConfirm');
            this.usuario = new Usuario();
            this.usuarionuevo = new Usuario();
            this.rolarray = new Array<string>();
          })
          .catch(() => {
            this.loadings.CerrarLoading();
            this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ha ocurrido un error al registra el empleado', 'alertConfirm');
          });
        }else{
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Error:', 'No existe el empleado con el código ingresado', 'alertConfirm');
        }
      })
      .catch(err => {
        console.log(err);
        this.loadings.CerrarLoading();
        this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ha ocurrido un error al registra el empleado', 'alertConfirm');
      });
    });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ingrese el código y Seleccione un tipo de empleado', 'alertConfirm');
    }
  }

  empleadonormalSubmited(form: NgForm){
    let mensajeError = '';
    let rolempleado = '';
    if (this.usuario.validarCedula(this.usuario.cedula)){
    if (form.control.valid && (this.rolarray !== undefined && this.rolarray !== null && this.rolarray.length !== 0)){
      for (let index = 0; index < this.rolarray.length; index++) {
        rolempleado += this.rolarray[index].toString();
      }
      this.usuario.rol = rolempleado;
      this.usuario.estado = 'D';
      const clavealeatoria = this.generaClave();
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      this.subscriptions.add( this.auth.nuevoUsuario(this.usuario, clavealeatoria).subscribe( (resp: any) => {
        this.usuario.id = resp.localId;
        this.usuario.toMayusculas();
        this.firestore.UsuarioNuevo(this.usuario)
        .then(() => {
        })
        .catch((err) => {
          this.loadings.CerrarLoading();
        });
        this.emailservice.enviarCredencialesbyEmail(this.usuario.email, clavealeatoria)
        .subscribe( res => {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Empleado registrado con éxito', 'alertConfirm');
          this.usuario.VaciarUsuario();
        });
       }, (err) => {
          this.loadings.CerrarLoading();
          const error = err.error.error.message;
          switch (error) {
            case 'EMAIL_EXISTS':
              mensajeError = 'Este correo electrónico ya se encuentra asociado a una cuenta...';
              break;
            default:
              mensajeError = 'Error Desconocido...';
              break;
          }

          this.alerts.presentAlert(this.alertctrl, 'Error:' , mensajeError , 'alertConfirm');
        }));
      });
    }else{
        this.alerts.presentAlert(this.alertctrl, 'Error:', 'LLene los campos y Seleccione un tipo de empleado', 'alertConfirm');
      }
  }else{
    this.alerts.presentAlert(this.alertctrl, 'Error:', 'Cedula Incorrecta', 'alertConfirm');
  }
}
}
