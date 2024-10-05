import { Injectable } from '@angular/core';
import {HttpClient,HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EditarUsuarioService {
  private apiUrl = 'https://bancanet.vercel.app/users'
  constructor(
    private http: HttpClient,
    private authService: AuthService,
  ) { }

  editarUsuario(idUsuario: string, changes:any): Observable<any> {
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.put(`${this.apiUrl}/${idUsuario}`, changes, {headers})
  }
}
