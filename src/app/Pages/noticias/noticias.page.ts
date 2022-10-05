import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Slides } from '../../Models/Slides';
import { FirestoreService } from '../../services/firestore.service';
import { Noticia } from '../../Models/Noticia';
import { SocialSharing } from '@ionic-native/social-sharing/ngx';
import { Alerts } from '../../Models/Alerts';
import { AlertController, ToastController, Platform, LoadingController } from '@ionic/angular';
import { Subscription } from 'rxjs';
import { Loadings } from '../../Models/Loadings';

@Component({
  selector: 'app-noticias',
  templateUrl: './noticias.page.html',
  styleUrls: ['./noticias.page.scss'],
})

export class NoticiasPage implements OnInit {

  private subscriptions = new Subscription();
  noticiasarray: Array<Noticia>;
  fecha: Noticia;
  alerts: Alerts;
  loadings: Loadings;
  slideOptsOne = {
    direction: 'vertical',
    // autoplay: true,
    // speed: 1000,
  };
  noticia: Noticia;
  estado = false;
  constructor(private router: Router, private firestore: FirestoreService, private socialSharing: SocialSharing,
              private alertctrl: AlertController, private toastController: ToastController,
              private plataform: Platform, private loadingctrl: LoadingController) {
    this.noticiasarray = new Array<Noticia>();
    this.fecha = new Noticia();
    this.noticia = new Noticia();
    this.alerts = new Alerts();
    if (this.plataform.is('android') || this.plataform.is('ios') ){
      this.estado = true;
    }
    this.loadings = new Loadings(loadingctrl);
   }

  ngOnInit() {
    this.obtenerNoticiasMes(this.fecha.construirFecha(new Date()));
  }

  OnDestroy() {
    this.subscriptions.unsubscribe();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }


  compartirSocial(index: any){
    this.noticia = this.noticiasarray[index];
    this.socialSharing.share(
      this.noticia.titulo + ': ' + this.noticia.contenido,
      this.noticia.contenido,
      '',
      this.noticia.imagen,
    );
  }


  obtenerNoticiasMes(mes: string){
    this.loadings.presentLoading('Un momento porfavor estamos cargando las Noticias...').then(() => {
    this.subscriptions.add( this.firestore.ObtenerNoticias(mes).subscribe((noticias: any) => {
      if (noticias){
      this.noticiasarray = new Array<Noticia>();
      for (let index = 0; index < noticias.length; index++) {
        this.noticiasarray.push(noticias[index].payload.doc.data());
      }
      this.loadings.CerrarLoading();
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Sin Datos', 'No existe Noticias del mes actual', 'alertConfirm');
      this.loadings.CerrarLoading();
    }
    }));
  });
  }

  shareFacebook(e, index: any) {
    this.noticia = this.noticiasarray[index];
    const URIencode = encodeURIComponent(this.noticia.imagen);
    e.preventDefault();
    const facebookWindow = window.open('https://www.facebook.com/sharer/sharer.php?u=' + URIencode , 'facebook-popup', 'height=350,width=600');
    if (facebookWindow.focus) { facebookWindow.focus(); }
    return false;
   }

}
