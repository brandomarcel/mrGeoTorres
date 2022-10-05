import { Component, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import * as CryptoJS from 'crypto-js';
import { DetallenoticiasComponent } from 'src/app/components/detallenoticias/detallenoticias.component';
import { Noticia } from 'src/app/Models/Noticia';
import { Slides } from 'src/app/Models/Slides';
import { FirestoreService } from 'src/app/services/firestore.service';
import { llaveEncrypt } from 'src/environments/environment.prod';
@Component({
  selector: 'app-noticiasgestion',
  templateUrl: './noticiasgestion.page.html',
  styleUrls: ['./noticiasgestion.page.scss'],
})
export class NoticiasgestionPage implements OnInit {

noticias: Array<Noticia>;
noticiaaux: Noticia;
slidesprops: Slides;
slideOptsOne: any;

  constructor(private firestore: FirestoreService, private modalctrl: ModalController) {
    this.noticias = new Array<Noticia>();
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    let dataeuserid = CryptoJS.AES.decrypt(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
    dataeuserid = dataeuserid.toString(CryptoJS.enc.Utf8);
    this.firestore.ObtenerNoticiasByUsuario(dataeuserid).subscribe((resp: any) => {
      this.noticias = new Array<Noticia>();
      if (resp.length > 0 || resp !== undefined || resp !== null) {
        for (let index = 0; index < resp.length; index++) {
          this.noticiaaux = resp[index].payload.doc.data();
          this.noticiaaux.id = resp[index].payload.doc.id;
          this.noticias.push(this.noticiaaux);
        }
      }
      
    });
   }

  ngOnInit() {
  }

  async modalDetalleAsistencia(i: number){
    const noticia = this.noticias[i];
    const modal = await this.modalctrl.create({
      component: DetallenoticiasComponent,
      componentProps: {
        noticia
      },
      cssClass: 'modalcss'
    });
    modal.present();
  }

}
