import { Injectable } from '@angular/core';
import { Usuario } from '../Models/Usuario';
import { AngularFirestore, AngularFirestoreModule} from '@angular/fire/firestore';
import { Socio } from '../Models/Socio';
import { Menu } from '../Interfaces/Menu';
import { AsistenciaTecnica } from '../Models/AsistenciaTecnica';
import { Consumo } from '../Models/Consumo';
import { Noticia } from '../Models/Noticia';
import { Ruta } from '../Models/Ruta';
@Injectable({
  providedIn: 'root'
})
export class FirestoreService {
  planilla: Consumo;
  id: string;

  constructor(private database: AngularFirestore) {
    this.planilla = new Consumo();
    AngularFirestoreModule.enablePersistence({synchronizeTabs: true});
   }

  // Guarda  un nuevo Usuario
UsuarioNuevo(user: Usuario){
  return this.database.collection('Usuarios').doc(user.id).set({...user});
}

ObtenerDataUsuario(userid: string){
return this.database.collection('Usuarios').doc(userid).snapshotChanges();
}

VerificarSocio(codigo: string){
return this.database.collection('Socios', ref => ref.where('codigo', '==' , codigo.toString().trim())).get();
}

ObtenerDatauerById(id: string){
  return this.database.collection('Usuarios', ref => ref.where('id', '==' , id).where('estado', '!=' , 'B')).snapshotChanges();
  }

  ObtenerUsuariosBajas(){
    return this.database.collection('Usuarios', ref => ref.where('estado', '==' , 'B')).snapshotChanges();
    }

ObtenerDatauerBycode(codigo: number){
  return this.database.collection('Usuarios', ref => ref.where('codigo', '==' , codigo).where('estado', '==' , 'D')).get();
  }

ActualizarEstadoSocio(socio: Socio, id: string){
  return this.database.collection('Socios').doc(id).update(socio);
}

ActualizarRolUsuarioBaja(user: Usuario, id: string){
  return this.database.collection('Usuarios').doc(id).update(user);
}

ObtenerCodigoSocio(cedula: string){
  return this.database.collection('Socios', ref => ref.where('cedula', '==' , cedula.toString().trim())).get();
}

ObtenerMenuUsuario(rol: string[]){
    return this.database.collection<Menu>('Menu', ref => ref
    .where('permiso', 'array-contains-any' , rol)
    .orderBy('item')).snapshotChanges();
}

ActualizarDataUsuario(usuario: Usuario, id: string){
  return this.database.collection('Usuarios').doc(id).update(usuario);
}

ObtenerValorConsumo(codigos: Array<string>){
  return this.database.collection('Planilla', ref => ref.where('codigo', 'in' , codigos)
                                                        .where('fecha', '==', this.planilla.construirFecha(new Date()) )).snapshotChanges();
}

IngresarAsistencia(asistencia: AsistenciaTecnica){
  return this.database.collection('Asistencia').add({...asistencia});
}

ObtenerAsistenciaCodigo(codigo: string){
  return this.database.collection('Asistencia', ref => ref.where('codigoCierre', '==' , codigo.toString().trim())).get();
}

ActualizarAsistenciaTecnica(asistencia: AsistenciaTecnica, id: string){
  return this.database.collection('Asistencia').doc(id).update(asistencia);
}

ActualizarEstadoNoticia(noticia: Noticia, id: string){
  return this.database.collection('Noticias').doc(id).update(noticia);
}

IngresarValoresPlanillas(planilla: Consumo){
  return this.database.collection('Planilla').add({...planilla});
}

ActualizarValorPlanilla(planilla: Consumo, id: string){
  return this.database.collection('Planilla').doc(id).update(Object.assign({}, planilla));
}

VerificarCodigo(codigo: string){
 return this.database.collection('Socios', ref => ref.where('codigo', '==' , codigo.toString().trim())).get();
}

VerificarValorMensual(codigo: string, fecha: string){
  return this.database.collection('Planilla', ref => ref.where('codigo', '==' , codigo.toString().trim())
                                                        .where('fecha', '==', fecha.toString().trim())).get();
}

IngresarNoticia(noticia: Noticia){
  return this.database.collection('Noticias').add({...noticia});
}

ObtenerNoticias(fecha: string){
  return this.database.collection('Noticias', ref => ref.where('fecha', '==' , fecha).where('estado', '==' , 'aprobado')).snapshotChanges();
}

ObtenerNoticiasByUsuario(user: string){
  return this.database.collection('Noticias', ref => ref.where('idUsuario', '==' , user).where('estado', '==' , 'aprobado')).snapshotChanges();
}

ObtenerIdUsuarioByCedula(cedula: string){
  return this.database.collection('Usuarios', ref => ref.where('cedula', '==' , cedula.toString().trim()).where('estado', '==' , 'D')).get();
}

ObtenerMarkers(empleado: string, fecha: string){
  return this.database.collection('Ruta', ref => ref.where('idTecnico', '==' , empleado).where('fecha', '==', fecha)).snapshotChanges();
}

ObtenerIdUsuarioByCodigo(codigo: number){
  return this.database.collection('Usuarios', ref => ref.where('codigo', '==' , codigo).where('estado', '==' , 'D')).get();
}

ObtenerAsistenciasPendientes(){
  return this.database.collection('Asistencia', ref => ref.where('estado', '==' , 'pendiente')).snapshotChanges();
}

ObtenerTecnicos(){
  return this.database.collection('Usuarios', ref => ref.where('estado', '!=' , 'B')).snapshotChanges();
}

ObtenerAsistenciasCerradasbyFecha(fecha: string){
  return this.database.collection('Asistencia', ref => ref.where('estado', '==' , 'cerrado').where('fechaCierre', '==', fecha)).get();
}

ObtenerAsistenciasPendientebyFecha(fecha: string){
  return this.database.collection('Asistencia', ref => ref.where('estado', '==' , 'pendiente').where('fecha', '==', fecha)).get();
}

ObtenerAsistenciasEjecucionbyFecha(fecha: string){
  return this.database.collection('Asistencia', ref => ref.where('estado', '==' , 'ejecucion').where('fecha', '==', fecha)).get();
}

ObtenerAsistenciasbyTecnico(id: string){
  return this.database.collection('Asistencia', ref => ref.where('idTecnico', '==' , id)
                                                          .where('estado', '==', 'ejecucion')).snapshotChanges();
}

ObtenerAsistenciasbyUsuario(id: string){
  return this.database.collection('Asistencia', ref => ref.where('idUsuario', '==' , id)
                                                          .where('estado', '!=', 'cerrado')).snapshotChanges();
}

IngresarPuntoRuta(punto: Ruta){
  return this.database.collection('Ruta').add({...punto});
}

async ReporteAsistenciasFechas(parametro: string, inicio: string, fin: string, buscando?: string){
  if(parametro === 'general'){
    return this.database.collection('Asistencia', ref => ref
    .where('fecha', '>=', inicio)
    .where('fecha', '<=', fin)).snapshotChanges();
  }
  if(parametro === 'idTecnico' || parametro === 'idUsuario'){
    await this.ObtenerIdUsuarioByCedula(buscando).toPromise().then(resp => {
      if(resp.docs[0]){
        this.id = resp.docs[0].id;
      }
      
    });
    return this.database.collection('Asistencia', ref => ref.where(parametro, '==', this.id)
                                                          .where('fecha', '>=', inicio)
                                                          .where('fecha', '<=', fin)).snapshotChanges();
  }

  if(parametro === 'barrio'){
    return this.database.collection('Asistencia', ref => ref.where(parametro, '==', buscando)
    .where('fecha', '>=', inicio)
    .where('fecha', '<=', fin)).snapshotChanges();
  }
  
}

}
