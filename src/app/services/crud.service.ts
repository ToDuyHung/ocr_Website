import { Injectable } from '@angular/core';
import { AngularFirestore } from 'angularfire2/firestore'
import { AngularFireDatabase } from 'angularfire2/database';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class CrudService {

  private apiServer =  environment.apiUrl;

  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type': 'application/json; charset=utf-8'
    })
  }

  constructor(private httpClient: HttpClient) { }

  pushUrl(imgUrl, apiUrl): Observable<any> {
    return this.httpClient.post(apiUrl, imgUrl, this.httpOptions)
  }

  pullLatLng(apiUrl): Observable<any>   { 
    return this.httpClient.get(apiUrl, this.httpOptions)
  }
}
