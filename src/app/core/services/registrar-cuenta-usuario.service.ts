import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class RegistrarCuentaUsuarioService {
  private apiUrl = 'https://bancanet.vercel.app/accounts'
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  crearCuentaUsuario(usuarioData: any): Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post(this.apiUrl,usuarioData, {headers})
  }
}
