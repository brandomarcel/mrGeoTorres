import { Component, OnInit } from '@angular/core';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { AlertController, ModalController, Platform, LoadingController } from '@ionic/angular';
import { NgForm } from '@angular/forms';
import { MapaAsistenciaComponent } from '../../components/mapa-asistencia/mapa-asistencia.component';
import { FirestoreService } from '../../services/firestore.service';
import * as CryptoJS from 'crypto-js';
import { llaveEncrypt } from '../../../environments/environment';
import { Slides } from '../../Models/Slides';
import { Alerts } from '../../Models/Alerts';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Router } from '@angular/router';
import { Loadings } from '../../Models/Loadings';

@Component({
  selector: 'app-reportarasistencia',
  templateUrl: './reportarasistencia.page.html',
  styleUrls: ['./reportarasistencia.page.scss'],
})

export class ReportarasistenciaPage implements OnInit {
 asistencia: AsistenciaTecnica;
 coord: Array<number>;
 slidesprops: Slides;
 slideOptsOne: any;
 alerts: Alerts;
 loadings: Loadings;
 rolarray: string[];
 nuevorol: string;

  constructor(private alertctrl: AlertController, private modalctrl: ModalController,
              private firestore: FirestoreService, private plataforma: Platform,
              private diagnostic: Diagnostic, private router: Router, private loadingctrl: LoadingController) {
    this.asistencia = new AsistenciaTecnica();
    this.coord = new Array<number>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.alerts = new Alerts();
    this.loadings = new Loadings(loadingctrl);
    this.rolarray = new Array<string>();
   }

  ngOnInit() {
  }

  onChange(val){
    console.log("Selected:",val);
  }


  asistenciaSubmited(form: NgForm){
    if (form.control.valid && (this.nuevorol !== undefined && this.nuevorol !== null && this.nuevorol.length !== 0)){
      if (this.asistencia !== null && this.asistencia !== undefined){
        this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
        let dataeuserid = CryptoJS.AES.decrypt(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
        dataeuserid = dataeuserid.toString(CryptoJS.enc.Utf8);
        this.asistencia.idUsuario =  dataeuserid;
        this.asistencia.fecha = this.asistencia.construirFecha(new Date());
        this.asistencia.estado = 'pendiente';
        this.asistencia.codigoCierre = '';
        this.asistencia.idTecnico = '';
        this.asistencia.fechaCierre = '';
        this.asistencia.barrio = this.nuevorol;
        this.firestore.IngresarAsistencia(this.asistencia)
        .then(() => {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Asistencia ingresada exitosamente', 'alertConfirm');
          this.limpiarForm();
          this.rolarray = new Array<string>();
        }
        )
        .catch(() => {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Error', 'Ha ocurrido un error al ingresar la asistencia', 'alertConfirm');
        });
      });
      }
  } else {
    this.alerts.presentAlert(this.alertctrl, 'Error:', 'Campos Incorrectos...', 'alertConfirm');
}

}

async modalMapa(){
  const modal = await this.modalctrl.create({
    component: MapaAsistenciaComponent,
    cssClass: 'modalcss'
  });
  modal.present();
  const { data } = await modal.onDidDismiss();
  if (data !== null && data !== undefined){
  this.asistencia.longitud = data.longitud;
  this.asistencia.latitud = data.latitud;
  }
}

limpiarForm(){
  this.asistencia = new AsistenciaTecnica();
}

GPSstate(){
  if (this.plataforma.is('android') || this.plataforma.is('ios')){
    this.diagnostic.isLocationEnabled()
  .then((enabled: any) => {
    if (!enabled){
      this.alerts.EncenderGPS(this.alertctrl, 'GPS Off', 'Para continuar porfavor encienda el GPS',
      this.router, this.diagnostic, 'alertConfirm');
    }else{
      this.modalMapa();
    }
  }).catch();
}else{
  this.modalMapa();
}
}

}
