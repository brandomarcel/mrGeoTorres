import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController, ModalController } from '@ionic/angular';
import { DetalleasistenciausuarioComponent } from 'src/app/components/detalleasistenciausuario/detalleasistenciausuario.component';
import { Alerts } from 'src/app/Models/Alerts';
import { AsistenciaTecnica } from 'src/app/Models/AsistenciaTecnica';
import { EncriptDecript } from 'src/app/Models/EncriptDecript';
import { Loadings } from 'src/app/Models/Loadings';
import { Slides } from 'src/app/Models/Slides';
import { FirestoreService } from 'src/app/services/firestore.service';
import { llaveEncrypt } from 'src/environments/environment.prod';

@Component({
  selector: 'app-misasistencias',
  templateUrl: './misasistencias.page.html',
  styleUrls: ['./misasistencias.page.scss'],
})
export class MisasistenciasPage implements OnInit {
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

  ngOnInit() {
    this.CargarPendientes();
  }

  async modalDetalleAsistencia(i: number){
    const asistencia = this.pendientes[i];
    const modal = await this.modalctrl.create({
      component: DetalleasistenciausuarioComponent,
      componentProps: {
        asistencia
      },
      cssClass: 'modalcss'
    });
    modal.present();
  }

  private CargarPendientes() {
    this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      const idTecnico = this.encryptdecrypt.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
      this.firestore.ObtenerAsistenciasbyUsuario(idTecnico).subscribe((resp: any) => {
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
