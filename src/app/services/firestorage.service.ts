import { Injectable } from '@angular/core';
import { AngularFireStorage } from 'angularfire2/storage';
@Injectable({
  providedIn: 'root'
})
export class FirestorageService {

  constructor(private storage: AngularFireStorage) { }

  GuardarImagenNoticia(Imagen: any){
    const numnoticia = Math.random().toString();
    const selfieRef = this.storage.ref('/noticias/imagen' + numnoticia + '.jpeg');
    return selfieRef.putString(Imagen, 'base64', {contentType: 'image/jpeg'});
  }
}
