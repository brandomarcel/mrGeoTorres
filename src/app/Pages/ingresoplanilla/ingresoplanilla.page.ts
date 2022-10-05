import { Component, OnInit } from '@angular/core';
import { Slides } from '../../Models/Slides';
import { Alerts } from '../../Models/Alerts';
import { Consumo } from '../../Models/Consumo';
import { NgForm } from '@angular/forms';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Loadings } from '../../Models/Loadings';
import { Subscription } from 'rxjs';
import { Usuario } from '../../Models/Usuario';
import { Socio } from 'src/app/Models/Socio';

@Component({
  selector: 'app-ingresoplanilla',
  templateUrl: './ingresoplanilla.page.html',
  styleUrls: ['./ingresoplanilla.page.scss'],
})
export class IngresoplanillaPage implements OnInit {
  slidesprops: Slides;
  slideOptsOne: any;
  alerts: Alerts;
  valorplanilla: Consumo;
  entero: string;
  usuario: Socio;
  nombre: string;
  apellido: string;
  decimalcadena: string;
  loadings: Loadings;
  correcto: boolean;
  private subscriptions = new Subscription();

  constructor(private alertctrl: AlertController, private firestore: FirestoreService,
              private loadingctrl: LoadingController) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.alerts = new Alerts();
    this.valorplanilla = new Consumo();
    this.loadings = new Loadings(loadingctrl);
    this.correcto = true;
   }

   async ActulizarValor(alertctrlconfirm: AlertController, header: string, message: string, idPlanilla: string, cssClass?: string) {
        const alert = await alertctrlconfirm.create({
          header,
          message,
          cssClass,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
               this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
               this.firestore.ActualizarValorPlanilla(this.valorplanilla, idPlanilla)
               .then(() => {
                 this.loadings.CerrarLoading();
                 this.alerts.presentAlert(this.alertctrl, 'Éxito', 'Valor actualizado con éxito', 'alertConfirm');
                 this.valorplanilla = new Consumo();
                 this.entero = '';
                 this.decimalcadena = '';
                 this.nombre='';
               })
               .catch(() => {
                this.loadings.CerrarLoading();
                this.alerts.presentAlert(this.alertctrl, 'Error', 'Ha ocurrido un error en la actualización del valor', 'alertConfirm');
               });
              });
              }
            }
          ]
        });
        alert.present();
      }

  ngOnInit() {
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ValidarCode(){
    if (this.valorplanilla.codigo !== undefined && this.valorplanilla.codigo !== ''){
          this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
          this.firestore.VerificarSocio(this.valorplanilla.codigo).subscribe((res: any) => {
            if (res.docs[0]){
            this.usuario = res.docs[0].data();
            this.nombre = this.usuario.cedula; 
            this.loadings.CerrarLoading();
            this.correcto = false;
          }else{
            this.alerts.presentAlert(this.alertctrl, 'Error', 'No existe información del usuario con el código ingresado', 'alertConfirm');
            this.loadings.CerrarLoading();
            this.correcto = true;
          }
            });
          });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error', 'Por favor, ingrese un código de usuario', 'alertConfirm');
      this.correcto = true;
    }

  }


  planillaSubmited(form: NgForm){
    if (form.control.valid){
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      this.subscriptions.add( this.firestore.VerificarCodigo(this.valorplanilla.codigo).subscribe(res => {
        if (res.docs[0]){
          const fechaingreso = this.valorplanilla.construirFecha(new Date());
          this.valorplanilla.fecha = fechaingreso;
          const valornuevo = this.entero + ',' + this.decimalcadena;
          this.valorplanilla.valor = valornuevo;
          this.subscriptions.add( this.firestore.VerificarValorMensual(this.valorplanilla.codigo, fechaingreso).subscribe(valor => {
            if (valor.docs[0]){
              const pagar = valor.docs[0].data().valor;
              const id = valor.docs[0].id;
              this.loadings.CerrarLoading();
              const mensaje = 'Ya existe un valor de' + ' ' + pagar + '$' + ' ' + 'asignado al código' + this.valorplanilla.codigo + ' ' + 'desea actualizarlo?';
              this.ActulizarValor(this.alertctrl, 'Actualizar', mensaje, id, 'alertConfirm');
            }else{
             this.firestore.IngresarValoresPlanillas(this.valorplanilla)
             .then(() => {
              this.loadings.CerrarLoading();
              this.alerts.presentAlert(this.alertctrl, 'Éxito', 'Valor Ingresado con étixo', 'alertConfirm');
              this.valorplanilla = new Consumo();
              this.entero = ' ';
              this.decimalcadena = ' ';
              this.nombre=' ';
             })
             .catch(() => {
              this.loadings.CerrarLoading();
              this.alerts.presentAlert(this.alertctrl, 'Error', 'Ha ocurrido un error al insertar el valor', 'alertConfirm');
             });
            }
          }));
        }else{
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Error', 'El código ingresado no exíste', 'alertConfirm');
        }
      }));
    });
    }
  }
}
