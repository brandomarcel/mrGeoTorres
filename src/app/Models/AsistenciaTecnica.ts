import * as moment from 'moment';
export class AsistenciaTecnica {
id: string;
idUsuario: string;
asunto: string;
detalle: string;
fecha: string;
longitud: string;
latitud: string;
contacto: string;
estado: string;
idTecnico: string;
fechaCierre: string;
codigoCierre: string;
barrio: string;

constructor(){
}

construirFecha(date: Date){
    const formatedDate = moment(new Date()).format('YYYY-MM-DD');
    // const formatedDate = date.toISOString().substring(0, 10);
    return formatedDate;
  }

  construirFechaUnix(timestamp: number){
    const time = moment(timestamp).format('hh:mm:ss');
    return time.toString();
  }

}

