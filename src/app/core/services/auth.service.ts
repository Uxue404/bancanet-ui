import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";
import { jwtDecode } from "jwt-decode";
import {AuthRoleService} from "./auth-role.service";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  //private  apiUrl = 'http://localhost:3000'
  private apiUrl = 'https://bancanet.vercel.app';
  private loginUrl = `${this.apiUrl}/auth/login`;
  private tokenKey = 'auth_token';
  private idUser = ''
  constructor(
    private authRole: AuthRoleService,
    private http: HttpClient,
    private router: Router
  ) { }

  login(userName: string, password: string) : Observable<LoginResponse> {
    const body = {
      userName: userName,
      password: password,
    }

    //const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.loginUrl, body).pipe(
      tap(res =>{
        if (res.token){
          this.setToken(res.token)
          // console.log("Token: " + res.token);
          this.decodeToken(res.token)
        }
      })
    )

  }

  decodeToken(token:string):void {
    const arrayToken = token.split(".");
    const tokenPayload = JSON.parse(atob(arrayToken[1]));
    // console.log(tokenPayload);
    const role:string = tokenPayload.payload.role;

    this.authRole.setRole(role);
    const nameUser:string = tokenPayload.payload.name;
    const id:string = tokenPayload.payload.id;
    localStorage.setItem('name', nameUser)
    localStorage.setItem('role', role);
    this.setId(id)

  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
  }

  private setId(id: string):void{
    localStorage.setItem('id', id);
  }

  getId(): string | null{
    return localStorage.getItem('id');
  }


  isAuthenticated():boolean{
    const token = this.getToken()
    if(!token){
      return false
    }
    const payload = JSON.parse(atob(token.split(".")[1]))
    const exp = payload.exp * 1000;
    return Date.now() < exp
  }


  logout():void{
    localStorage.removeItem(this.tokenKey);
    localStorage.removeItem('name');
    localStorage.removeItem('role');
    this.router.navigate(['/'])
    console.log("Adioooos")
  }



}

interface LoginResponse {
  token: string;
}
