import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";
@Injectable({
  providedIn: 'root'
})
export class TransferenciaService {
  private apiUrl = 'https://bancanet.vercel.app/transactions'

  constructor(
    private http: HttpClient,
    private authService: AuthService,) { }

  hacerTransferencia(data: any ):Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post(this.apiUrl,data, {headers})
  }
}
