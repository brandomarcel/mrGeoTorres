import { Injectable } from '@angular/core';
import { Network } from '@ionic-native/network/ngx';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class NetworkService {

  public estadored: BehaviorSubject<any> = new BehaviorSubject<any>(true);
  constructor(private network: Network) {
   }

  VerificarNetwork(){
    this.network.onDisconnect().subscribe(resp => {
      this.estadored.next(false);
});
    this.network.onConnect().subscribe(res => {
      this.estadored.next(true);
    });
  }
}
