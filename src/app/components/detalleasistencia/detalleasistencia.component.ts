import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { mapboxKey, datosmapa} from '../../../environments/environment.prod';
import { ModalController, LoadingController, AlertController } from '@ionic/angular';
import { ListaempleadosComponent } from '../listaempleados/listaempleados.component';
import { Usuario } from '../../Models/Usuario';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { FirestoreService } from '../../services/firestore.service';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
@Component({
  selector: 'app-detalleasistencia',
  templateUrl: './detalleasistencia.component.html',
  styleUrls: ['./detalleasistencia.component.scss'],
})
export class DetalleasistenciaComponent implements OnInit {

@Input() asistencia: AsistenciaTecnica;
mapa: mapboxgl.Map;
tecnicoseleccionado: Usuario;
loadings: Loadings;
alerts: Alerts;

  constructor(private modalctrl: ModalController, private firestore: FirestoreService,
              private loadingctrl: LoadingController, private alertctrl: AlertController) {
    this.loadings = new Loadings(loadingctrl);
    this.alerts = new Alerts();
   }

  ngOnInit() {
    this.cargarMapa();
  }

  cargarMapa(){
    mapboxgl.accessToken = mapboxKey.mapboxllave;
    this.mapa = new mapboxgl.Map({
    container: 'mapa-asis',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [this.asistencia.longitud, this.asistencia.latitud],
    zoom: 14
  });
    this.mapa.on('load', () => {
    this.mapa.resize();
  });
    this.mapa.addControl(
          new mapboxgl.GeolocateControl({
          positionOptions: {
          enableHighAccuracy: true
          },
          trackUserLocation: true
          })
        );
    const el = document.createElement('div');
    el.className = 'marker';
    el.style.backgroundImage = 'url(assets/Imagenes/markers/engranaje.svg)';
    el.style.backgroundSize = 'cover';
    el.style.width = '35px';
    el.style.height = '35px';
    el.style.borderRadius = '50%';
    this.crearMarker(el, Number(this.asistencia.longitud), Number(this.asistencia.latitud));
  }

    crearMarker(el: any, long: number, lat: number){
      const marker = new mapboxgl.Marker(el, {
        draggable: true
      })
      .setLngLat([long, lat])
      .addTo(this.mapa);
    }

    async ModalEmpleado(){
      const modal = await this.modalctrl.create({
        component: ListaempleadosComponent,
        cssClass: 'modalcss'
      });
      modal.present();
      const { data } = await modal.onDidDismiss();
      if (data !== null && data !== undefined){
        this.tecnicoseleccionado = data.tecnico;
      }
    }

    cerradmodal(){
      this.modalctrl.dismiss();
    }

    generaCodigoCierre() {
      let result = '';
      const characters = '1234567890';
      const charactersLength = characters.length;
      for (let i = 0; i < 6; i++) {
          result += characters.charAt(Math.floor(Math.random() * charactersLength));
      }
      return result;
  }

    asignar(){
      this.asistencia.idTecnico = this.tecnicoseleccionado.id;
      this.asistencia.estado = 'ejecucion';
      this.asistencia.codigoCierre = this.generaCodigoCierre();
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
        this.firestore.ActualizarAsistenciaTecnica(this.asistencia, this.asistencia.id)
        .then(() => {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Éxito:', 'Tarea asignada con éxito', 'alertConfirm');
          this.modalctrl.dismiss();
        })
        .catch(() => {
          this.loadings.CerrarLoading();
          this.alerts.presentAlert(this.alertctrl, 'Error:', 'Ha ocurrido un error al asignar la tarea', 'alertConfirm');
        });
      });
    }
}
