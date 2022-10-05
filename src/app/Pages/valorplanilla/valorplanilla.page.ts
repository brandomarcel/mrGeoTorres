import { Component, OnInit } from '@angular/core';
import * as CryptoJS from 'crypto-js';
import { llaveEncrypt } from '../../../environments/environment';
import { FirestoreService } from '../../services/firestore.service';
import { Consumo } from '../../Models/Consumo';
import { Router } from '@angular/router';
import { Slides } from '../../Models/Slides';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { Subscription } from 'rxjs';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
import { LoadingController, AlertController } from '@ionic/angular';

@Component({
  selector: 'app-valorplanilla',
  templateUrl: './valorplanilla.page.html',
  styleUrls: ['./valorplanilla.page.scss'],
})

export class ValorplanillaPage implements OnInit {
  slidesprops: Slides;
  slideOptsOne: any;
  codigos: Array<string>;
  valores: Array<Consumo>;
  encryptdecrypt: EncriptDecript;
  private subscriptions = new Subscription();
  loadings: Loadings;
  alerts: Alerts;

  constructor( private firestore: FirestoreService, private router: Router,
               private loadingctrl: LoadingController, private alertctrl: AlertController) {
    this.codigos = new Array<string>();
    this.valores = new Array<Consumo>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.encryptdecrypt = new EncriptDecript();
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
  }

  ngOnInit() {

  }

  ionViewWillEnter(){
    this.ObtenerValoresPlanilla();
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

  ObtenerValoresPlanilla(){
    const decryptedCodes = this.encryptdecrypt.DesencriptarObjeto(localStorage.getItem('codigos'), llaveEncrypt.llaveEncrypt);
    this.codigos = decryptedCodes;
    if (this.codigos !== null && this.codigos !== undefined){
      this.loadings.presentLoading('Un momento por favor cargando planillas de cosnumo...').then(() => {
      this.subscriptions.add( this.firestore.ObtenerValorConsumo(this.codigos).subscribe((valor: any) => {
        this.valores = new Array<Consumo>();
        if (valor.length > 0){
          this.valores = new Array<Consumo>();
          this.codigos = new Array<string>();
          for (let index = 0; index < valor.length; index++) {
            this.valores.push(valor[index].payload.doc.data());
          }
          this.loadings.CerrarLoading();
        }else{
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Sin Datos', 'No existen valores de planillas del usuario asigandas al mes actual', 'alertConfirm');
        }
        }));
      });
    }
  }

}
