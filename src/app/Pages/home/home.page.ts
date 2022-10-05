import { Component, OnInit, ViewChild } from '@angular/core';
import { FirestoreService } from '../../services/firestore.service';
import { Usuario } from '../../Models/Usuario';
import { Menu } from '../../Interfaces/Menu';
import { HeaderComponent } from '../../components/header/header.component';
import { Subscription } from 'rxjs';
import * as CryptoJS from 'crypto-js';
import { llaveEncrypt } from '../../../environments/environment.prod';
import 'firebase/firestore';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { Router } from '@angular/router';
import { AthenticationService } from 'src/app/services/athentication.service';
import { Alerts } from 'src/app/Models/Alerts';
import { Loadings } from 'src/app/Models/Loadings';
import { AlertController, LoadingController, ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: './home.page.html',
  styleUrls: ['./home.page.scss'],
})

export class HomePage implements OnInit {

private subscriptions = new Subscription();
userid: string;
usuario: Usuario;
image: string;
estado: boolean;
menuOpts: Menu[];
alerts: Alerts;
loadings: Loadings;


@ViewChild(HeaderComponent) header: HeaderComponent;
encriptdecrit: EncriptDecript;

  constructor(private firestore: FirestoreService, private router: Router, private authservice: AthenticationService
              ,private loadingctrl: LoadingController, private alertController: AlertController, private toastController: ToastController) {
    this.encriptdecrit = new EncriptDecript();
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
   }

ngOnInit(){
  
  }

  ionViewWillEnter(){
    this.header.cargarDatosUsuario();
    this.cargarMenusuario();
    this.alerts = new Alerts();
  }

  doRefresh(event) {
    window.location.reload();
    event.target.complete();
  }

  OnDestroy() {
    this.loadings = new Loadings(this.loadingctrl);
    this.alerts = new Alerts();
    this.subscriptions.unsubscribe();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: 'danger'
    });
    toast.present();
  }


  cargarMenusuario(){
    const dataeuserid = this.encriptdecrit.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
    this.userid = dataeuserid;
    if (this.userid !== null && this.userid !== undefined){
      this.subscriptions.add(this.firestore.ObtenerDataUsuario(this.userid).subscribe((resp: any) => {
      let arrayrol = new Array();
      this.menuOpts = new Array<Menu>();
      this.usuario = resp.payload.data();
      if(this.usuario.estado === 'B'){
        this.router.navigateByUrl('/login');
        this.authservice.logOut();
        this.presentToast('Cuenta inhabilitada por favor contáctese con el administrador');
      }
      
      if(this.usuario){
      for (let index = 0; index < this.usuario.rol.length; index++) {
       arrayrol[index] = this.usuario.rol.charAt(index);
      }
    }
    
      this.subscriptions.add(this.firestore.ObtenerMenuUsuario(arrayrol).subscribe((menu: any) => {
        this.menuOpts = new Array<Menu>();
        let arrayrol = new Array();
        if (menu.length > 0){
         // tslint:disable-next-line: prefer-for-of
         for (let index = 0; index < menu.length; index++) {
           this.menuOpts.push(menu[index].payload.doc.data());
         }
       }
      }));
    }));
    }
  }

}
