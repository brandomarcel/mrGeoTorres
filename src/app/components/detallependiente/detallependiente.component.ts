import { Component, Input, OnInit } from '@angular/core';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import * as mapboxgl from 'mapbox-gl';
import { mapboxKey, datosmapa} from '../../../environments/environment.prod';
import { Loadings } from '../../Models/Loadings';
import { Alerts } from '../../Models/Alerts';
import { ModalController, Platform } from '@ionic/angular';

@Component({
  selector: 'app-detallependiente',
  templateUrl: './detallependiente.component.html',
  styleUrls: ['./detallependiente.component.scss'],
})
export class DetallependienteComponent implements OnInit {

@Input() asistencia: AsistenciaTecnica;
mapa: mapboxgl.Map;
loadings: Loadings;
alerts: Alerts;
localizar: true;

  constructor(private modalctrl: ModalController, private platform: Platform) { }

  ngOnInit() {
    this.cargarMapa();
  }

  cargarMapa(){
    mapboxgl.accessToken = mapboxKey.mapboxllave;
    this.mapa = new mapboxgl.Map({
    container: 'mapa-asispend',
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
      })
      .setLngLat([long, lat])
      .addTo(this.mapa);
    }

    cerradmodal(){
      this.modalctrl.dismiss();
    }

    indicacionesMapa(){
      const destination = this.asistencia.latitud + ',' + this.asistencia.longitud;
      if (this.platform.is('ios')){
      window.open('maps://?q=' + destination, '_system');
      } else if (this.platform.is('android')){
      const label = encodeURI('My Label');
      window.open('geo:0,0?q=' + destination + '(' + label + ')', '_system');
      } else {
        window.open('https://maps.google.com/?q=' + destination, '_system');
      }
    }
}
