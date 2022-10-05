import { Component, OnInit, Input } from '@angular/core';
import { PopoverController, Platform } from '@ionic/angular';
import { PopoverProfileComponent } from '../popover-profile/popover-profile.component';
import { AthenticationService } from '../../services/athentication.service';
import { Router } from '@angular/router';
import { Usuario } from '../../Models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit {
@Input() image: string;
@Input() nombre: string;
@Input() apellido: string;
@Input() cargando = false;
userid: string;
usuario: Usuario;
encryptdecrypt: EncriptDecript;
dispositivo: boolean;
conectado: boolean;

  constructor(public popoverCtrl: PopoverController,
              private authservice: AthenticationService,
              private router: Router,
              private firestore: FirestoreService,
              private platform: Platform,
              private networkserv: NetworkService) {
                this.encryptdecrypt = new EncriptDecript();
                if (this.platform.is('android') || this.platform.is('ios')){
                  this.dispositivo = true;
                } else {
                  this.dispositivo = false;
                }
              }

  ngOnInit() {
    this.estadoRed();
  }

  estadoRed(){
    this.networkserv.estadored.subscribe((res) => {
      this.conectado = res;
    });
  }

  async presentPopover(ev: any) {
    const popover = await this.popoverCtrl.create({
      component: PopoverProfileComponent,
      // cssClass: 'my-custom-class',
      event: ev,
      translucent: true
    });
    await popover.present();
    // para cuando se acaba de cerrar
    const { data } = await popover.onDidDismiss();
    // para hacer algo cuando apenas se cierre
    if (data !== undefined && data !== null ){
      if (data.item === 'salir') {
        this.Salir();
      }else{
        if (data.item === 'editarperfil') {
          this.editarPerfil();
        }
      }
    }
  }

  doRefresh(event) {
    window.location.reload();
    event.target.complete();
  }

  Salir(){
    this.authservice.logOut();
    this.router.navigateByUrl('/login');
      }

  logoclick(){
    this.router.navigateByUrl('/sigeo/noticias');
  }

  editarPerfil(){
    this.router.navigateByUrl('/sigeo/editprofile');
  }

  cargarDatosUsuario(){
    const dataeuserid = this.encryptdecrypt.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
    this.userid = dataeuserid;
    if (this.userid !== null && this.userid !== undefined){
    this.firestore.ObtenerDataUsuario(this.userid).subscribe((resp: any) => {
      this.usuario = resp.payload.data();
      const userEncrypt = this.encryptdecrypt.EncriptarObjeto(this.usuario, llaveEncrypt.llaveEncrypt);
      localStorage.setItem('user', userEncrypt);
      if(this.usuario){
      this.nombre = this.usuario.nombre;
      this.apellido = this.usuario.apellido;
      this.obtenerCodigoSocio(this.usuario.cedula);
      if (this.usuario.genero === 'H'){
        this.image = '/assets/Imagenes/avatares/hombre.svg';

      }else{
        this.image = '/assets/Imagenes/avatares/mujer.svg';
      }
      this.cargando = true;
      }
    });
    }
  }

  obtenerCodigoSocio(cedula: string){
    let i = 0;
    this.firestore.ObtenerCodigoSocio(cedula).toPromise()
    .then(resp => {
      const codigosArray: Array<string> = new Array<string>();
      resp.forEach(socio => {
        codigosArray[i] = socio.data().codigo;
        i++;
  });
      const codesEncrypt = this.encryptdecrypt.EncriptarObjeto(codigosArray, llaveEncrypt.llaveEncrypt);
      localStorage.setItem('codigos', codesEncrypt);
    })
    .catch(error => {
    });
  }

}
