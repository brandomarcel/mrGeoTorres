import { Component, OnInit } from '@angular/core';
import { AlertController, LoadingController } from '@ionic/angular';
import { Alerts } from 'src/app/Models/Alerts';
import { Loadings } from 'src/app/Models/Loadings';
import { Slides } from 'src/app/Models/Slides';
import { Usuario } from 'src/app/Models/Usuario';
import { FiltroPipe } from 'src/app/pipes/filtro.pipe';
import { FirestoreService } from 'src/app/services/firestore.service';

@Component({
  selector: 'app-gestionusu',
  templateUrl: './gestionusu.page.html',
  styleUrls: ['./gestionusu.page.scss'],
})
export class GestionusuPage implements OnInit {

tecnicos: Array<Usuario>;
tecnicosbusqueda: Array<Usuario>;
textobuscar: string;
alerts: Alerts;
loadings: Loadings;
slidesprops: Slides;
slideOptsOne: any;

constructor(private firestore: FirestoreService, private filtro: FiltroPipe,
  private alertController: AlertController, private loadingctrl: LoadingController) {
this.tecnicos = new Array<Usuario>();
this.tecnicosbusqueda = new Array<Usuario>();
this.loadings = new Loadings(loadingctrl);
this.alerts = new Alerts();
this.slidesprops = new Slides();
this.slideOptsOne = this.slidesprops.optslides;
}

ngOnInit() {
  this.CargarTecnicos();
}

  async presentAlertConfirm(tecnicoselec: Usuario) {
    const alert = await this.alertController.create({
      cssClass: 'alertConfirm',
      header: 'Confirmar',
      message: 'Dar de baja a: <strong>' + tecnicoselec.nombre + ' ' + tecnicoselec.apellido + '</strong>' + '?',
      buttons: [
        {
          text: 'Cancelar',
          role: 'cancel',
          cssClass: 'secondary',
          handler: (blah) => {
          }
        }, {
          text: 'Aceptar',
          handler: () => {
            if(tecnicoselec.rol.length < 2 && tecnicoselec.rol.length != 0 ) {
              tecnicoselec.estado = 'B';
              this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then( () => {
                this.firestore.ActualizarRolUsuarioBaja(tecnicoselec, tecnicoselec.id)
              .then(()=> {
                tecnicoselec  = null;
                this.loadings.CerrarLoading();
                this.alerts.presentAlert(this.alertController, 'Éxito', 'Empleado dado de baja con éxito', 'alertConfirm');
              })
              .catch(()=>{
                this.loadings.CerrarLoading();
                this.alerts.presentAlert(this.alertController, 'Error', 'Ha ocurrido un error al realizar la operación', 'alertConfirm');
              });
              });

            }else{

              if(tecnicoselec.rol.includes('T')){
                tecnicoselec.rol = tecnicoselec.rol.replace('T', '');
              }
              if (tecnicoselec.rol.includes('O')){
                tecnicoselec.rol = tecnicoselec.rol.replace('O', '');
              }
              if (tecnicoselec.rol.includes('A')){
                tecnicoselec.rol = tecnicoselec.rol.replace('A', '');
              }

              this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then( () => {
                this.firestore.ActualizarRolUsuarioBaja(tecnicoselec, tecnicoselec.id)
              .then(()=> {
                tecnicoselec  = null;
                this.loadings.CerrarLoading();
                this.alerts.presentAlert(this.alertController, 'Éxito', 'Empleado dado de baja con éxito', 'alertConfirm');
              })
              .catch(()=>{
                this.loadings.CerrarLoading();
                this.alerts.presentAlert(this.alertController, 'Error', 'Ha ocurrido un error al realizar la operación', 'alertConfirm');
              });
              });
            }
          }
        }
      ]
    });

    await alert.present();
  }


  private CargarTecnicos() {
    let tecnico: Usuario;
    this.firestore.ObtenerTecnicos().subscribe((resp: any) => {
      this.tecnicos = new Array<Usuario>();
      if (resp[0]) {
        for (let index = 0; index < resp.length; index++) {
          
          const rol = resp[index].payload.doc.data().rol;
          if (rol.includes('U')) {
            tecnico = new Usuario();
            tecnico = resp[index].payload.doc.data();
            tecnico.id = resp[index].payload.doc.id;
            this.tecnicos.push(tecnico);
          }
        }
      }
      
    });
    
  }


  buscartecnico(event){  
    this.textobuscar = event.detail.value;
    this.tecnicosbusqueda = this.filtro.transform(this.tecnicos, this.textobuscar, 'nombre');
  }
  seleccionarTecnico(i: number){
  if (this.tecnicosbusqueda.length < 1 || this.tecnicosbusqueda === undefined || this.tecnicosbusqueda === null){
    this.presentAlertConfirm(this.tecnicos[i]);
  }else{
    this.presentAlertConfirm(this.tecnicosbusqueda[i]);
  }
  }


}
