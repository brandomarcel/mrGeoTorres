import { AlertController } from '@ionic/angular';
import { Diagnostic } from '@ionic-native/diagnostic/ngx';
import { Router } from '@angular/router';
export class Alerts {

constructor(){

}
    async presentAlert(alertctrl: AlertController, header: string, message: string, cssClass?: string) {
        const alert = await alertctrl.create({
          header,
          cssClass,
          message,
          buttons: [
            {
              text: 'Aceptar',
              cssClass: 'alertButton',
              handler: (blah) => {
      // si presiona en el boton OK
              }
            }
          ]
        });
        await alert.present();
      }

      async EncenderGPS(alertctrlconfirm: AlertController, header: string, message: string,
                        router: Router, diagnostic?: Diagnostic, cssClass?: string) {
        const alert = await alertctrlconfirm.create({
          header,
          message,
          cssClass,
          buttons: [
            {
              text: 'Cancelar',
              role: 'cancel',
              handler: () => {
              }
            },
            {
              text: 'Aceptar',
              handler: () => {
                diagnostic.switchToLocationSettings();
              }
            }
          ]
        });
        alert.present();
      }
}
