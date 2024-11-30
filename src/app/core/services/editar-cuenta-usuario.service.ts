import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";

@Injectable({
  providedIn: 'root'
})
export class EditarCuentaUsuarioService {
  private apiUrl = 'https://bancanet.vercel.app/accounts'
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  editarCuenta (idAccount: string, changes : any){
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.put(`${this.apiUrl}/${idAccount}`, changes, {headers})
  }
}
