import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {

    if (this.authService.isAuthenticated()) {
      const role = localStorage.getItem('role');
      if(state.url === '/login'){
        if (role === 'user'){
          return this.router.navigate(['/home/user']);
        }else if(role === 'admin'){
          return this.router.navigate(['/home/admin']);
        }
      }
      return true
    } else {
      return this.router.navigate(['/login']);
    }


  }
}
