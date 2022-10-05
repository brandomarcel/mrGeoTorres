export class Consumo {
    codigo: string;
    valor: string;
    fecha: string;
        constructor() {
        }

    construirFecha(date: Date){
        const formatedDate = date.toISOString().substring(0, 7);
        return formatedDate;
        }
    }