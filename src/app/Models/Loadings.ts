import { LoadingController } from '@ionic/angular';
export class Loadings {
  loading: any;
    constructor(private loadingController: LoadingController){

    }

    async presentLoading(message: string) {
        this.loading = await this.loadingController.create({
          cssClass: 'loadingclass',
          message,
        });
        await this.loading.present();
        return this.loading;
      }

      async CerrarLoading(){
          this.loading = await this.loadingController.dismiss();
      }
}
