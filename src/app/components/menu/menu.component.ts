import { Component, OnInit, Input } from '@angular/core';
import { Usuario } from '../../Models/Usuario';
import { FirestoreService } from '../../services/firestore.service';
import { Menu } from '../../Interfaces/Menu';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})

export class MenuComponent implements OnInit {
userid: string;
usuario: Usuario;
menuOpts: Menu[];
  constructor(private firestore: FirestoreService) {
    this.cargarMenusuario();
   }

  ngOnInit() {
  }

  cargarMenusuario(){
    this.userid = localStorage.getItem('userId');
    if (this.userid !== null && this.userid !== undefined){
     this.firestore.ObtenerDataUsuario(this.userid).subscribe((resp: any) => {
      let arrayrol = new Array();
      this.menuOpts = new Array<Menu>();
      this.usuario = resp.payload.data();
      for (let index = 0; index < this.usuario.rol.length; index++) {
       arrayrol[index] = this.usuario.rol.charAt(index);
      }
      this.firestore.ObtenerMenuUsuario(arrayrol).subscribe((menu: any) => {
        this.menuOpts = new Array<Menu>();
        let arrayrol = new Array();
        if (menu.length > 0){
         for (let index = 0; index < menu.length; index++) {
           this.menuOpts.push(menu[index].payload.doc.data());
         }
         this.menuOpts.sort();
       }
      });
    });
    }
  }
}
