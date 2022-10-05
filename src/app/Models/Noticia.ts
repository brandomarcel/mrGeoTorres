export class Noticia {
    titulo: string;
    imagen: string;
    contenido: string;
    fecha: string;
    idUsuario: string;
    estado: string;
    id: string;
    constructor(){
    }

    construirFecha(date: Date){
        const formatedDate = date.toISOString().substring(0, 7);
        return formatedDate;
        }
}