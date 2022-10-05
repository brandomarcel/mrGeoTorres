import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { Slides } from '../../Models/Slides';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetallependienteComponent } from '../../components/detallependiente/detallependiente.component';

@Component({
  selector: 'app-asistenciastecnico',
  templateUrl: './asistenciastecnico.page.html',
  styleUrls: ['./asistenciastecnico.page.scss'],
})
export class AsistenciastecnicoPage implements OnInit {
  encryptdecrypt: EncriptDecript;
  pendientes: Array<AsistenciaTecnica>;
  slidesprops: Slides;
  slideOptsOne: any;
  loadings: Loadings;
  alerts: Alerts;

  constructor(private firestore: FirestoreService, private loadingctrl: LoadingController, private alertctrl: AlertController,
              private modalctrl: ModalController) {
    this.encryptdecrypt = new EncriptDecript();
    this.pendientes = new Array<AsistenciaTecnica>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
   }

   async modalDetalleAsistencia(i: number){
    const asistencia = this.pendientes[i];
    const modal = await this.modalctrl.create({
      component: DetallependienteComponent,
      componentProps: {
        asistencia
      },
      cssClass: 'modalcss'
    });
    modal.present();
  }

  ngOnInit() {
    this.CargarPendientes();
  }

  private CargarPendientes() {
    this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      const idTecnico = this.encryptdecrypt.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
      this.firestore.ObtenerAsistenciasbyTecnico(idTecnico).subscribe((resp: any) => {
        this.pendientes = new Array<AsistenciaTecnica>();
        if (resp.length > 0 || resp !== undefined || resp !== null) {
          for (let index = 0; index < resp.length; index++) {
            this.pendientes.push(resp[index].payload.doc.data());
          }
          this.loadings.CerrarLoading();
        } else {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'No Datos', 'No existen asistencias para ejecutarlas', 'alertConfirm');
        }
      });
    });
  }

}
