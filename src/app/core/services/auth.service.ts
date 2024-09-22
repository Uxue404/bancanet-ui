import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Observable, tap} from "rxjs";
import {Router} from "@angular/router";

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private apiUrl = 'https://bancanet.vercel.app';
  private loginUrl = `${this.apiUrl}/auth/login`;
  private tokenKey = 'auth_token';
  constructor(
    private http: HttpClient,
    private router: Router
  ) { }

  login(userName: string, password: string) : Observable<LoginResponse> {
    const body = {
      userName: userName,
      password: password,
    }
    const headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    return this.http.post<LoginResponse>(this.loginUrl, body, {headers}).pipe(
      tap(res =>{
        if (res.token){
          this.setToken(res.token)
          console.log("Token: " + res.token);
        }
      })
    )

  }

  private setToken(token: string): void {
    localStorage.setItem(this.tokenKey, token);
  }

  getToken(): string | null {
    return localStorage.getItem(this.tokenKey);
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
    this.router.navigate(['/login'])
  }



}

interface LoginResponse {
  token: string;
}
