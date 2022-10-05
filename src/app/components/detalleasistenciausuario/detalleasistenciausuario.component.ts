import { Component, Input, OnInit } from '@angular/core';
import { ModalController } from '@ionic/angular';
import { AsistenciaTecnica } from 'src/app/Models/AsistenciaTecnica';

@Component({
  selector: 'app-detalleasistenciausuario',
  templateUrl: './detalleasistenciausuario.component.html',
  styleUrls: ['./detalleasistenciausuario.component.scss'],
})
export class DetalleasistenciausuarioComponent implements OnInit {

  constructor(private modalctrl: ModalController) { }
  @Input() asistencia: AsistenciaTecnica;
  ngOnInit() {}

  cerradmodal(){
    this.modalctrl.dismiss();
  }

}
