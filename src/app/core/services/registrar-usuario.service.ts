import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable} from "rxjs";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class RegistrarUsuarioService {
  private apiUrl = 'https://bancanet.vercel.app/auth/register'
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  registrarUsuario(usuarioData: any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.post(this.apiUrl,usuarioData, {headers})
  }
}
