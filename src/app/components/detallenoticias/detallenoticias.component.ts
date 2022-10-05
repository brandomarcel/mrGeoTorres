import { Component, Input, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { Alerts } from 'src/app/Models/Alerts';
import { Loadings } from 'src/app/Models/Loadings';
import { Noticia } from 'src/app/Models/Noticia';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-detallenoticias',
  templateUrl: './detallenoticias.component.html',
  styleUrls: ['./detallenoticias.component.scss'],
})
export class DetallenoticiasComponent implements OnInit {

  @Input() noticia: Noticia;
  loadings: Loadings;
  alerts: Alerts;
  
  constructor(private modalctrl: ModalController, private loadingctrl: LoadingController,
              public alertController: AlertController, public firestore: FirestoreService, public alertctrl: AlertController) {
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
   }

  ngOnInit() {
   
  }

  async presentAlertConfirm() {
    const alert = await this.alertController.create({
      cssClass: 'alertConfirm',
      header: 'Confirmar',
      message: '¿Está seguro de eliminar la noticia?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
            
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            this.noticia.estado = 'eliminado';
            this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
              this.firestore.ActualizarEstadoNoticia(this.noticia, this.noticia.id).then(() => {
                this.loadings.CerrarLoading();
                this.cerradmodal();
                this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Noticia eliminada correctamente', 'alertConfirm');
              }).catch( () => {
                this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ha ocurrido un error al eliminar la noticia', 'alertConfirm');
                this.loadings.CerrarLoading();
              }
              );
            })
            
          }
        }
      ]
    });

    await alert.present();
  }

  cerradmodal(){
    this.modalctrl.dismiss();
  }

  eliminarNoticia(){
    this.presentAlertConfirm();
  }



}
