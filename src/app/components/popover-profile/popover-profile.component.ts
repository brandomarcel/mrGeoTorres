import { Component, OnInit } from '@angular/core';
import { PopoverController } from '@ionic/angular';

@Component({
  selector: 'app-popover-profile',
  templateUrl: './popover-profile.component.html',
  styleUrls: ['./popover-profile.component.scss'],
})

export class PopoverProfileComponent implements OnInit {
opcion: string;

  constructor(private popoverCtrl: PopoverController) { }

  ngOnInit() {}

  clickSalir(){
    this.opcion = 'salir';
    this.popoverCtrl.dismiss({
       item: this.opcion
    });
  }

  clickProfile(){
    this.opcion = 'editarperfil';
    this.popoverCtrl.dismiss({
      item: this.opcion
    });
  }
}
