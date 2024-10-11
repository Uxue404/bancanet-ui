import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class ObtenerCuentasUsuarioService {
  private apiUrl = 'https://bancanet.vercel.app/accounts/user';
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  obtenerCuentasUsuarioId(id: string) {
    const token = this.authService.getToken() || '';
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    return this.http.get(`${this.apiUrl}/${id}`, {headers})
  }
}
