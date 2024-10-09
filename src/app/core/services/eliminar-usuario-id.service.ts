import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class EliminarUsuarioIdService {
  private apiUrl = 'https://bancanet.vercel.app/users'

  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  eliminarUsuarioId(idUser: string): Observable<any>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    return this.http.delete(`${this.apiUrl}/${idUser}`, {headers})
  }

}
