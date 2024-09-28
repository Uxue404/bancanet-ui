import { Injectable } from '@angular/core';
import {AuthRoleService} from "./auth-role.service";
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {Router} from "@angular/router";
import {AuthService} from "./auth.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuariosNameService {

  private apiUrl = 'https://bancanet.vercel.app';
  private token = this.authService.getToken();


  constructor(
    private authRole: AuthRoleService,
    private http: HttpClient,
    private router: Router,
    private authService: AuthService
  ) { }

  searchUsers(name: string = '', email: string = '', phoneNumber: string = '', page:number=1, limit: number=10): Observable<UserResponse>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })

    let params = new HttpParams()
      .set('page', page.toString())
      .set('limit', limit.toString())

    if (name) params = params.set('name', name);
    if (email) params = params.set('email', email);
    if (phoneNumber) params = params.set('phoneNumber', phoneNumber);
    console.warn('Parámetros:', params.toString());

    return this.http.get<UserResponse>(`${this.apiUrl}/users/autocomplete`,{headers, params})
      .pipe(
        catchError(error => {
          console.warn("Error en la peticion: ", error);
          return throwError( ()=> new Error(error));
        })
      )
  }

}

export interface User {
  name: string;
  email: string;
  phoneNumber: string;
  userName: string;
  id: string;
}

export interface UserResponse {
  message: string;
  result: {
    users: User[];
    total: number;
    page: number;
    pages: number;
  };
  statusCode: number;
}

