import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  constructor(private http: HttpClient) { }

  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  enviarCredencialesbyEmail(to: string, pass: string){
    return this.http.post( `https://us-central1-mrgeo-3cbca.cloudfunctions.net/enviarCredencialesMail?dest=
                            ${to}&user=${to}&pass=${pass}`, this.httpHeader).pipe(
                              map(resp => {
                                return resp;
                              })
                            );
  }
}
