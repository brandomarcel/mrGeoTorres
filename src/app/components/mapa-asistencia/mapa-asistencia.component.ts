import { Component, OnInit } from '@angular/core';
import * as mapboxgl from 'mapbox-gl';
import { mapboxKey } from '../../../environments/environment.prod';
import { ModalController, Platform, AlertController } from '@ionic/angular';
import { Geolocation } from '@ionic-native/geolocation/ngx';
import { LocationAccuracy } from '@ionic-native/location-accuracy/ngx';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Alerts } from '../../Models/Alerts';
import MapboxGeocoder from '@mapbox/mapbox-gl-geocoder';
import '@mapbox/mapbox-gl-geocoder/dist/mapbox-gl-geocoder.css';
@Component({
  selector: 'app-mapa-asistencia',
  templateUrl: './mapa-asistencia.component.html',
  styleUrls: ['./mapa-asistencia.component.scss'],
})

export class MapaAsistenciaComponent implements OnInit {
mapa: mapboxgl.Map;
geocoder: MapboxGeocoder;
position: Array<any>;
alerts: Alerts;

  constructor( private modalctrl: ModalController, private geolocation: Geolocation, private locationacurrancy: LocationAccuracy ,
               private plataforma: Platform, private diagnostic: Diagnostic, private alertctrl: AlertController) {
    this.position = new Array<any>();
    this.alerts = new Alerts();
   }

  ngOnInit() {
    this.buildMapa();
  }

  buildMapa(){
    this.geolocation.getCurrentPosition().then(geopos => {
      mapboxgl.accessToken = mapboxKey.mapboxllave;
      this.mapa = new mapboxgl.Map({
      container: 'mapa-mapbox',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [geopos.coords.longitude, geopos.coords.latitude],
      zoom: 16
    });

      this.geocoder = new MapboxGeocoder({
      accessToken: mapboxKey.mapboxllave,
      mapboxgl
      });
      this.mapa.addControl(this.geocoder);

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
      this.crearMarker(el, geopos.coords.longitude, geopos.coords.latitude);
    }).catch();
  }

  obtenerLocalizacion(){
    this.modalctrl.dismiss({
      longitud: this.position[0].lng,
      latitud: this.position[0].lat
    });
  }


  crearMarker(el: any, long: number, lat: number){
    const marker = new mapboxgl.Marker(el, {
      draggable: true
    })
    .setLngLat([long, lat])
    .addTo(this.mapa);
    marker.on('dragend', () => {
      this.position = new Array<number>();
      this.position.push(marker.getLngLat());
    });
    this.position.push(marker.getLngLat());
  }
}
