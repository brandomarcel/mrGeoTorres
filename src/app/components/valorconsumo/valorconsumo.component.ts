import { Component, OnInit, Input } from '@angular/core';
import { Consumo } from '../../Models/Consumo';
import { datosinformativos } from '../../../environments/environment.prod';

@Component({
  selector: 'app-valorconsumo',
  templateUrl: './valorconsumo.component.html',
  styleUrls: ['./valorconsumo.component.scss'],
})
export class ValorconsumoComponent implements OnInit {
@Input() code: Consumo;
@Input() valores: Array<Consumo>;
mensaje: string;
telefono: string;
celular: string;
  constructor() {
    this.mensaje = datosinformativos.mensaje;
    this.telefono = datosinformativos.telefono;
    this.celular = datosinformativos.celular;
   }

  ngOnInit() {}

}
