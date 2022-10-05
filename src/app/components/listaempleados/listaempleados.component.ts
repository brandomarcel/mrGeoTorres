import { Component, OnInit } from '@angular/core';
import { Usuario } from 'src/app/Models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { FiltroPipe } from '../../pipes/filtro.pipe';
import { Alerts } from '../../Models/Alerts';
import { AlertController, ModalController } from '@ionic/angular';

@Component({
  selector: 'app-listaempleados',
  templateUrl: './listaempleados.component.html',
  styleUrls: ['./listaempleados.component.scss'],
})
export class ListaempleadosComponent implements OnInit {

tecnicos: Array<Usuario>;
tecnicosbusqueda: Array<Usuario>;
textobuscar: string;
alerts: Alerts;

  constructor(private firestore: FirestoreService, private filtro: FiltroPipe,
              private alertController: AlertController, private modalctrl: ModalController) {
    this.tecnicos = new Array<Usuario>();
    this.tecnicosbusqueda = new Array<Usuario>();
    this.alerts = new Alerts();
   }

  ngOnInit() {
    this.CargarTecnicos();
  }

  async presentAlertConfirm(tecnicoselec: Usuario) {
    const alert = await this.alertController.create({
      cssClass: 'alertConfirm',
      header: 'Confirmar',
      message: 'Asignar tarea a: <strong>' + tecnicoselec.nombre + ' ' + tecnicoselec.apellido + '</strong>',
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
              this.modalctrl.dismiss({
                tecnico: tecnicoselec
              });
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
          if (rol.includes('T')) {
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

  cerradmodal(){
    this.modalctrl.dismiss();
  }
}
