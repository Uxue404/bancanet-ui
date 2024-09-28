import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders, HttpParams} from "@angular/common/http";
import {AuthService} from "./auth.service";
import {catchError, Observable, throwError} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class ObtenerUsuariosNameService {

  private apiUrl = 'https://bancanet.vercel.app';


  constructor(
    private http: HttpClient,
    private authService: AuthService
  ) { }

  searchUsers(query: string = '',searField: string = '' ,page:number=1, limit: number=10): Observable<UserResponse>{
    const token = this.authService.getToken();
    const headers = new HttpHeaders({
      Authorization: `Bearer ${token}`
    })
    const searchField = this.detectFielType(query);
    let params = new HttpParams()
      .set(searchField, query)
      .set('page', page.toString())
      .set('limit', limit.toString());

    console.warn('Parámetros:', params.toString());

    return this.http.get<UserResponse>(`${this.apiUrl}/users/autocomplete`,{headers, params})
      .pipe(
        catchError(error => {
          console.warn("Error en la peticion: ", error);
          return throwError( ()=> new Error(error));
        })
      )
  }

  detectFielType(field: string):string{
    // Validación para email
    const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    // Validación para número de teléfono (números de 7 a 15 dígitos, por ejemplo)
    const phonePattern = /^[0-9]{1,15}$/;

    if(emailPattern.test(field)){
      return 'email'
    }
    if(phonePattern.test(field)){
      console.warn("numero detectado")
      return 'phoneNumber'
    }
    return 'name'
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

