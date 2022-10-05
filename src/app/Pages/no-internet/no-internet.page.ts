import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NavController } from '@ionic/angular';
import { Slides } from '../../Models/Slides';

@Component({
  selector: 'app-no-internet',
  templateUrl: './no-internet.page.html',
  styleUrls: ['./no-internet.page.scss'],
})

export class NoInternetPage implements OnInit {
  slidesprops: Slides;
  slideOptsOne: any;
  slides: { img: string, titulo: string, desc: string }[] = [
    {
      img: '/assets/nointernet/no-wifi.svg',
      titulo: 'No existe conexion a Internet',
      desc: 'Porfavor Revisa tu conexion a internet :('
    }
  ];
  constructor(private router: Router, public navCtrl: NavController) {
    this.slidesprops = new Slides();
    this.slideOptsOne = this.slidesprops.optslides;
   }

  ngOnInit() {
  }

  goHome(){
// this.router.navigateByUrl('/login');
this.navCtrl.pop();
  }
}
