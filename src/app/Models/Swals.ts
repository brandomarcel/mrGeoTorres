import Swal, { SweetAlertIcon } from 'sweetalert2';
export class Swalls{

    colorfondo = 'linear-gradient(197deg, rgb(15, 86, 107)0%, rgb(15, 86, 107) 13.5%, rgb(128, 201, 223) 33.33%, rgb(238, 232, 232) 100%)';

    presentSwall(title: string, text: string, icon: SweetAlertIcon){
        Swal.fire({
            allowOutsideClick: false,
            title,
            text,
            icon,
            // background: this.colorfondo,
            background: 'rgb(225,230,231)',
            backdrop: false //quitar fondo gris
          });
    }

    presentLoading(){
        Swal.showLoading();
    }

    cerrarSwall(){
        Swal.close();
    }
}
