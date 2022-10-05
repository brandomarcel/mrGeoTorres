import { Component, OnInit, Input } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { mapboxKey, datosmapa } from '../../../environments/environment.prod';
import * as moment from 'moment';
import { Alerts } from '../../Models/Alerts';
import { AlertController, LoadingController } from '@ionic/angular';
import { FirestoreService } from '../../services/firestore.service';
import { Loadings } from '../../Models/Loadings';
import { Subscription } from 'rxjs';

@Component({
  selector: 'app-asistenciamapa',
  templateUrl: './asistenciamapa.page.html',
  styleUrls: ['./asistenciamapa.page.scss'],
})

export class AsistenciamapaPage implements OnInit {
  mapa: mapboxgl.Map;
  buscando: any;
  customPickerOptions: any;
  mydate: any;
  alerts: Alerts;
  loadings: Loadings;
  private subscriptions = new Subscription();

  constructor(private alertctrl: AlertController, private firestore: FirestoreService, private loadingctrl: LoadingController) {
    this.alerts = new Alerts();
    this.loadings = new Loadings(this.loadingctrl);
   }

  ngOnInit() {
    this.cargarMapa();
    this.mydate = moment(new Date()).format('YYYY-MM-DD');
  }

  cargarMapa(){
    mapboxgl.accessToken = mapboxKey.mapboxllave;
    this.mapa = new mapboxgl.Map({
    container: 'mapa-empleados',
    style: 'mapbox://styles/mapbox/streets-v11',
    center: [datosmapa.longitud, datosmapa.latitud],
    zoom: 12
  });
    this.mapa.on('load', () => {
    this.mapa.resize();
  });
  }

  buscarRuta(){
    if ((this.buscando !== undefined && this.buscando !== null) && (this.mydate !== undefined && this.mydate !== null)){
      this.loadings.presentLoading('Un momento por favor, estamos ejecutando su petición').then(() => {
      this.firestore.ObtenerIdUsuarioByCedula(this.buscando).toPromise()
      .then(resp => {
        if (resp.docs[0]){
          const idusuario = resp.docs[0].id;
          this.subscriptions.add( this.firestore.ObtenerMarkers(idusuario, this.mydate).subscribe((resp: any) => {
            if (resp[0]){
              for (let index = 0; index < resp.length; index++) {
                const datapoint = resp[index].payload.doc.data();
                this.crearMarker(datapoint);
              }
              this.loadings.CerrarLoading();
            }else{
              this.cargarMapa();
              this.alerts.presentAlert(this.alertctrl, 'Error', 'No existe datos del empleado ', 'alertConfirm');
              this.loadings.CerrarLoading();
            }
          }));
        }else{
          this.alerts.presentAlert(this.alertctrl, 'Error', 'La cédula no pertenece a ningún empleado', 'alertConfirm');
          this.cargarMapa();
          this.loadings.CerrarLoading();
        }
      })
      .catch((error) => {
         this.loadings.CerrarLoading();
      });
    });
    }else{
      this.alerts.presentAlert(this.alertctrl, 'Error', 'Por favor, ingrese la cedula del empleado a buscar y seleccione una fecha', 'alertConfirm');
    }
  }

  ObtenerFecha(date) {
    this.mydate = moment(date).format('YYYY-MM-DD');
 }


 crearMarker(data: any){
  const el = document.createElement('div');
  el.className = 'marker';
  el.style.backgroundImage = 'url(assets/Imagenes/markers/person.svg)';
  el.style.backgroundSize = 'cover';
  el.style.width = '35px';
  el.style.height = '35px';
  el.style.borderRadius = '50%';
  el.style.cursor = 'pointer';
  this.Marker(el, data.longitud, data.latitud, data.hora);
 }

 Marker(el: any, long: number, lat: number, datahora: any){
  const marker = new mapboxgl.Marker(el, {
    draggable: false
  })
  .setLngLat([long, lat])
  .setPopup(new mapboxgl.Popup({ offset: 25 }) // add popups
  .setHTML('<h3>' + datahora + '</h3>'))
  .addTo(this.mapa);
}


}
