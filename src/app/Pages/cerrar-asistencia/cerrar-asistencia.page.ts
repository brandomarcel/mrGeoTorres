import { Component, OnInit } from '@angular/core';
import { Slides } from '../../Models/Slides';
import { NgForm } from '@angular/forms';
import { CerrarAsistencia } from '../../Models/CerrarAsistencia';
import { FirestoreService } from '../../services/firestore.service';
import { Alerts } from '../../Models/Alerts';
import { AlertController, LoadingController } from '@ionic/angular';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { Loadings } from '../../Models/Loadings';
import { Subscription } from 'rxjs';
import { Usuario } from '../../Models/Usuario';

@Component({
  selector: 'app-cerrar-asistencia',
  templateUrl: './cerrar-asistencia.page.html',
  styleUrls: ['./cerrar-asistencia.page.scss'],
})

export class CerrarAsistenciaPage implements OnInit {
  slidesprops: Slides;
  slideOptsOne: any;
  alerts: Alerts;
  cerrarasistencia: CerrarAsistencia;
  asistencia: AsistenciaTecnica;
  loadings: Loadings;
  usuario: Usuario;
  private subscriptions = new Subscription();

  constructor(private firestore: FirestoreService, private alertctrl: AlertController, private loadingctrl: LoadingController) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.cerrarasistencia = new CerrarAsistencia();
    this.alerts = new Alerts();
    this.asistencia = new AsistenciaTecnica();
    this.loadings = new Loadings(loadingctrl);
    this.usuario = new Usuario();
   }

  ngOnInit() {
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

  cierreSubmited(form: NgForm){
    if (form.control.valid){
      if (this.usuario.validarCedula(this.cerrarasistencia.cedula)){
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      this.asistencia = new AsistenciaTecnica();
      const fechacierre = this.asistencia.construirFecha(new Date());
      this.subscriptions.add( this.firestore.ObtenerAsistenciaCodigo(this.cerrarasistencia.codigo).subscribe( (resp: any) => {
        if (resp.docs[0] && resp.docs[0].data().estado === 'ejecucion'){
          const idUsu = resp.docs[0].data().idUsuario;
          this.firestore.ObtenerDataUsuario(idUsu).subscribe( (usuario: any) => {
            if (usuario.payload.data().cedula === this.cerrarasistencia.cedula) {
                const idAsistencia = resp.docs[0].id;
                this.asistencia = resp.docs[0].data();
                this.asistencia.fechaCierre = fechacierre;
                this.asistencia.estado = 'cerrado';
                this.firestore.ActualizarAsistenciaTecnica(this.asistencia, idAsistencia)
                .then(() => {
                  this.loadings.CerrarLoading();
                  this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Asistencia finalizada con éxito..', 'alertConfirm');
                  this.cerrarasistencia.cedula = '';
                  this.cerrarasistencia.codigo = '';
                })
                .catch( () => {
                  this.loadings.CerrarLoading();
                  this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ha ocurrido un error al finalizar la asistencia..', 'alertConfirm');
                });
            }else{
              this.loadings.CerrarLoading();
              this.alerts.presentAlert(this.alertctrl, 'Error:', 'La cedula ingresada no pertenece al socio que notificó la asistencia', 'alertConfirm');
            }
        });

        }else{
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Error:', 'No existe una asistencia asociada al codigo ingresado..', 'alertConfirm');
        }
      }));
    });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error:', 'Cédula incorrecta', 'alertConfirm');
    }
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error:', 'Campos incorrectos', 'alertConfirm');
    }
  }
}
