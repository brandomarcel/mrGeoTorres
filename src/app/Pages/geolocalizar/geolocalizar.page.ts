import { Component, OnInit } from '@angular/core';
import { Slides } from '../../Models/Slides';
import { BackgroundGeolocation, BackgroundGeolocationConfig, BackgroundGeolocationEvents, BackgroundGeolocationResponse } from '@ionic-native/background-geolocation/ngx';
import { ToastController, Platform } from '@ionic/angular';
import { SQLite, SQLiteObject } from '@ionic-native/sqlite/ngx';
import { AsistenciaTecnica } from '../../Models/AsistenciaTecnica';
import { llaveEncrypt } from '../../../environments/environment.prod';
import { EncriptDecript } from '../../Models/EncriptDecript';
import { BackgroundMode } from '@ionic-native/background-mode/ngx';
import { Ruta } from '../../Models/Ruta';
import { FirestoreService } from '../../services/firestore.service';
import { NetworkService } from '../../services/network.service';

@Component({
  selector: 'app-geolocalizar',
  templateUrl: './geolocalizar.page.html',
  styleUrls: ['./geolocalizar.page.scss'],
})
export class GeolocalizarPage implements OnInit {
  slidesprops: Slides;
  slideOptsOne: any;
  puntos: Array<any>;
  db: any;
  asistencia: AsistenciaTecnica;
  encryptdecrypt: EncriptDecript;
  datais: boolean;
  web: boolean;
  puntoruta: Ruta;
  conectado: boolean;
  porcentaje = 0;
  datosSincronizar = 0;
  habilitarplay: boolean;
  sincronizar: boolean;

  constructor(private toastctrl: ToastController, private backgroundGeolocation: BackgroundGeolocation,
              private sqlite: SQLite, private backgroundMode: BackgroundMode, private platform: Platform,
              private firestore: FirestoreService, private network: NetworkService) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
    this.puntos = new Array<any>();
    this.asistencia = new AsistenciaTecnica();
    this.encryptdecrypt = new EncriptDecript();
    this.datais = true;
    this.puntoruta = new Ruta();
    if (this.platform.is('android') || this.platform.is('ios')){
      this.web = false;
      this.sqlite.create({
        name: 'puntos.db',
        location: 'default'
      }).then((base: SQLiteObject) => {
        base.executeSql('CREATE TABLE IF NOT EXISTS Ruta(fecha VARCHAR(32), hora VARCHAR(32), idTecnico VARCHAR(32), latitud VARCHAR(32), longitud VARCHAR(32))', []).then( () => {
        }
        ).catch( () => {
        });
      });
      this.ObtenerNumeroDatos();
     }else{
      this.web = true;
     }
    this.iniciarConfig();
    this.network.estadored.subscribe((res) => {
      this.conectado = res;
    });
  }

  ngOnInit() {
  }


  public playGeolocalizacion(){
    this.backgroundMode.enable();
    this.iniciarConfig();
    this.iniciarGeolocalizacion();
  }

  async presentToast(mensaje: string) {
    const toast = await this.toastctrl.create({
      message: mensaje,
      duration: 3000
    });
    toast.present();
  }

  iniciarConfig(){

    const config: BackgroundGeolocationConfig = {
      desiredAccuracy: 10,
      stationaryRadius: 10,
      distanceFilter: 100,
      debug: true,
      stopOnTerminate: false,
      // Android only section
      startForeground: true,
      // fastestInterval: 50000
};
    this.backgroundGeolocation.configure(config)
  .then(() => {
    this.backgroundGeolocation.on(BackgroundGeolocationEvents.location).subscribe((location: BackgroundGeolocationResponse) => {
      const fechacierre = this.asistencia.construirFecha(new Date());
      const dataeuserid = this.encryptdecrypt.DesencriptarSimple(localStorage.getItem('userId'), llaveEncrypt.llaveEncrypt);
      this.puntoruta.fecha = fechacierre;
      this.puntoruta.hora = this.asistencia.construirFechaUnix(new Date(). getTime());
      this.puntoruta.idTecnico = dataeuserid;
      this.puntoruta.latitud = location.latitude.toString();
      this.puntoruta.longitud = location.longitude.toString();
      // tslint:disable-next-line: max-line-length
      if (this.conectado) {
        this.GuardarFirestore(this.puntoruta);
      }else{
        // tslint:disable-next-line: max-line-length
        this.guardarPuntoSqlite(fechacierre, this.asistencia.construirFechaUnix(new Date(). getTime()), dataeuserid, location.latitude.toString(), location.longitude.toString());
      }
      // this.puntos.push(location.latitude + ' ' + location.longitude);
    });

  })
  .catch( (err) => {
    this.presentToast('Error' + err);
  });
  }

  GuardarFirestore(punto: Ruta){
    return this.firestore.IngresarPuntoRuta(punto);
  }

  iniciarGeolocalizacion(){
    this.backgroundGeolocation.start();
  }

  private guardarPuntoSqlite(fecha: string, hora: string, idTecnico: string, latitud: string, longitud: string) {
    this.sqlite.create({
      name: 'puntos.db',
      location: 'default'
    }).then((base: SQLiteObject) => {
      // tslint:disable-next-line: max-line-length
      base.executeSql('INSERT INTO Ruta (fecha ,hora ,idTecnico, latitud, longitud) VALUES (?,?,?,?,?)', [fecha, hora, idTecnico, latitud, longitud]).then(() => {
      }
      ).catch((err) => {
        this.presentToast(err);
      });
    });
  }

  finalizarGeolocalizacion(){
    this.backgroundGeolocation.stop();
    this.backgroundMode.disable();
    this.datais = false;
  }

  showdata(){
    this.datais = false;
    this.sqlite.create({
      name: 'puntos.db',
      location: 'default'
    }).then((base: SQLiteObject) => {
      base.executeSql('SELECT * FROM Ruta ', []).then( (rs) => {
        this.puntos = new Array<any>();
        for (let index = 0; index < rs.rows.length; index++) {
          this.puntos.push(rs.rows.item(index));
        }
        this.presentToast(this.puntos.length.toString());
      }
      ).catch( () => {
        this.presentToast('no se puede leer');
      });
    });
  }

  BorrarRow(index: number){
    this.sqlite.create({
      name: 'puntos.db',
      location: 'default'
    }).then((base: SQLiteObject) => {
      base.executeSql('DELETE FROM Ruta WHERE rowid = ' + index.toString(), []).then( (rs) => {
      }
      ).catch( () => {
      });
    });
  }

  ObtenerNumeroDatos(){
    this.sqlite.create({
      name: 'puntos.db',
      location: 'default'
    }).then((base: SQLiteObject) => {
      base.executeSql('SELECT COUNT(*) AS TOTAL FROM Ruta ', []).then( (rs) => {
        this.datosSincronizar = rs.rows.item(0).TOTAL;
        if (this.datosSincronizar >= 0){
          this.sincronizar = true;
        }else{
          this.sincronizar = false;
        }
      }
      ).catch( () => {
      });
    });
  }

  cleardata(){
    this.sqlite.create({
      name: 'puntos.db',
      location: 'default'
    }).then((base: SQLiteObject) => {
      base.executeSql('DROP TABLE Ruta ', []).then( (rs) => {
        this.presentToast('tabla borrada');
      }
      ).catch( () => {
        this.presentToast('no se puede leer');
      });
    });
  }

  sincronizarDatosFirestorage(){
    if (this.conectado){
      this.habilitarplay = true;
      this.sqlite.create({
        name: 'puntos.db',
        location: 'default'
      }).then((base: SQLiteObject) => {
        base.executeSql('SELECT * FROM Ruta ', []).then( (rs) => {
          this.puntos = new Array<any>();
          for (let index = 0; index < rs.rows.length; index++) {
            this.puntoruta = new Ruta();
            this.puntoruta.fecha = rs.rows.item(index).fecha;
            this.puntoruta.hora = rs.rows.item(index).hora;
            this.puntoruta.idTecnico = rs.rows.item(index).idTecnico;
            this.puntoruta.latitud = rs.rows.item(index).latitud;
            this.puntoruta.longitud = rs.rows.item(index).longitud;
            this.GuardarFirestore(this.puntoruta).then(() => {
              const id = index + 1;
              this.BorrarRow(id);
              this.porcentaje = (index + 1) / rs.rows.length;
              this.datosSincronizar = this.datosSincronizar - 1;
            }
            ).catch(() => {
              this.presentToast('no se pudo insertar el dato');
            });
          }
          this.habilitarplay = false;
        }
        ).catch( () => {
          this.presentToast('no se puede leer');
        });
      });
    }else{
      this.habilitarplay = false;
      this.presentToast('Para sincronizar se requiere de una conexión a internet');
    }
  }


}
