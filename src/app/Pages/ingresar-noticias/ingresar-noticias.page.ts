import { Component, OnInit } from '@angular/core';
import { Slides } from '../../Models/Slides';
import { NgForm } from '@angular/forms';
import { Noticia } from '../../Models/Noticia';
import { Camera } from '@ionic-native/camera/ngx';
import { Platform, LoadingController, AlertController } from '@ionic/angular';
import { FirestorageService } from 'src/app/services/firestorage.service';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
import { FirestoreService } from '../../services/firestore.service';
import { Router } from '@angular/router';
import * as CryptoJS from 'crypto-js';
import { llaveEncrypt } from 'src/environments/environment.prod';

@Component({
  selector: 'app-ingresar-noticias',
  templateUrl: './ingresar-noticias.page.html',
  styleUrls: ['./ingresar-noticias.page.scss'],
})
export class IngresarNoticiasPage implements OnInit {

  slidesprops: Slides;
  slideOptsOne: any;
  noticia: Noticia;
  imagen: any;
  imageResponse: any;
  estado = false;
  loadings: Loadings;
  alerts: Alerts;
  tipo: string;
  tipoarchivo: string;
  
  constructor(private camera: Camera, private plataform: Platform,
              private firestorage: FirestorageService, private alertctrl: AlertController,
              private loadingctrl: LoadingController, private firestore: FirestoreService,
              private router: Router) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.noticia = new Noticia();
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
    if (this.plataform.is('android') || this.plataform.is('ios') ){
      this.estado = true;
    }
   }

  ngOnInit() {
  }

  noticiaSubmited(form: NgForm){
    if (form.control.valid){
     if (this.imagen) {
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      let dataeuserid = CryptoJS.AES.decrypt(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
      dataeuserid = dataeuserid.toString(CryptoJS.enc.Utf8);
      this.noticia.idUsuario = dataeuserid;
      this.firestorage.GuardarImagenNoticia(this.imagen)
      .then(imagenguardada => {
        imagenguardada.task.snapshot.ref.getDownloadURL().then(url => {
          this.noticia.fecha = this.noticia.construirFecha(new Date());
          this.noticia.imagen = url;
          this.noticia.estado = 'aprobado';
          try {
          this.firestore.IngresarNoticia(this.noticia)
          .then(() => {
            this.loadings.CerrarLoading();
            this.noticia = new Noticia();
            this.imagen = null;
            this.alerts.presentAlert(this.alertctrl, 'Éxito', 'Noticia Guardada exitosamente', 'alertConfirm');
          })
          .catch(() => {
            this.loadings.CerrarLoading();
            this.alerts.presentAlert(this.alertctrl, 'Error', 'Ha ocurrido un error al guardar la noticia', 'alertConfirm');
          });
        } catch (error) {
            
        }
        });
      }).catch(error => {
        this.loadings.CerrarLoading();
        this.alerts.presentAlert(this.alertctrl, 'Error', 'Ha ocurrido un error al subir la imagen', 'alertConfirm');
      });
    });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error', 'Selecione una imagen por favor', 'alertConfirm');
    }
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error', 'Campos incorrectos..', 'alertConfirm');
    }
  }

  selectFile() {
    const element: HTMLElement = document.querySelector('input[type="file"]') as HTMLElement;
    element.click();
}

handleInputChange(e) {
  const file = e.dataTransfer ? e.dataTransfer.files[0] : e.target.files[0];
  const pattern = /image-*/;
  const reader = new FileReader();
  if (file){
  if (!file.type.match(pattern)) {
    this.alerts.presentAlert(this.alertctrl, 'Error', 'Formato de imagen no válido', 'alertConfirm');
    return;
  }
}
  this.tipoarchivo = file.type;
  this.tipo = 'data:' + this.tipoarchivo + ';base64,';
  reader.onload = this.handleReaderLoaded.bind(this);
  reader.readAsDataURL(file);
}

handleReaderLoaded(e) {
  const reader = e.target;
  this.imagen = reader.result;
  if (this.tipoarchivo === 'image/jpeg'){
    this.imagen = this.imagen.substring(23);
  }else if (this.tipoarchivo === 'image/png'){
    this.imagen = this.imagen.substring(22);
  }else{
    this.alerts.presentAlert(this.alertctrl, 'Error', 'Formato de imagen no válido', 'alertConfirm');
  }
}

  selectSelfie(): void {
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.PHOTOLIBRARY,
      // allowEdit : true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      // saveToPhotoAlbum: true
    }).then(img => {
      this.imagen = img;
      // Send the picture to Firebase Storage
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log('ERROR ->' + JSON.stringify(error));
    });
  }

  takeSelfie(): void {
    this.camera.getPicture({
      quality : 95,
      destinationType : this.camera.DestinationType.DATA_URL,
      sourceType : this.camera.PictureSourceType.CAMERA,
      // allowEdit : true,
      encodingType: this.camera.EncodingType.JPEG,
      targetWidth: 500,
      targetHeight: 500,
      // saveToPhotoAlbum: true
    }).then(img => {
      this.imagen = img;
      // Send the picture to Firebase Storage
    }, error => {
      // Log an error to the console if something goes wrong.
      console.log('ERROR ->' + JSON.stringify(error));
    });
  }

  vermisnoticias(){
    this.router.navigateByUrl('/sigeo/noticiasgestion');
  }

}
