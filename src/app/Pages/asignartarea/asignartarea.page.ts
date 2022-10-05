import { Component, OnInit } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { DetalleasistenciaComponent } from '../../components/detalleasistencia/detalleasistencia.component';
import { Slides } from '../../Models/Slides';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';

@Component({
  selector: 'app-asignartarea',
  templateUrl: './asignartarea.page.html',
  styleUrls: ['./asignartarea.page.scss'],
})
export class AsignartareaPage implements OnInit {

pendientes: Array<AsistenciaTecnica>;
asistencia: AsistenciaTecnica;
slidesprops: Slides;
slideOptsOne: any;
loadings: Loadings;
alerts: Alerts;

  constructor(private firestore: FirestoreService, private modalctrl: ModalController,
              private loadingctrl: LoadingController, private alertctrl: AlertController) {
    this.pendientes = new Array<AsistenciaTecnica>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
   }

  ngOnInit() {
    this.CargarAsistenciasPendientes();
  }

  async modalDetalleAsistencia(i: number){
    const asistencia = this.pendientes[i];
    const modal = await this.modalctrl.create({
      component: DetalleasistenciaComponent,
      componentProps: {
        asistencia
      },
      cssClass: 'modalcss'
    });
    modal.present();
  }

  private CargarAsistenciasPendientes() {
    this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
    this.firestore.ObtenerAsistenciasPendientes().subscribe((resp: any) => {
      this.pendientes = new Array<AsistenciaTecnica>();
      if (resp[0]) {
        for (let index = 0; index < resp.length; index++) {
          this.asistencia = resp[index].payload.doc.data();
          this.asistencia.id =  resp[index].payload.doc.id;
          this.pendientes.push(this.asistencia);
        }
        this.loadings.CerrarLoading();
      }else{
        this.loadings.CerrarLoading();
        this.alerts.presentAlert(this.alertctrl, 'No Datos', 'No existen asistencias pendientes para ser asignadas', 'alertConfirm');
      }
    });
  });
  }
}
