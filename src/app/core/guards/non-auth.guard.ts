import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, CanActivate, Router, RouterStateSnapshot, UrlTree} from '@angular/router';
import { Observable } from 'rxjs';
import {AuthService} from "../services/auth.service";

@Injectable({
  providedIn: 'root'
})
export class NonAuthGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {
  }

  canActivate(): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    if (!this.authService.isAuthenticated()) {
      // Si el usuario no está autenticado, permitir el acceso a la página de login
      return true;
    } else {
      // Si el usuario está autenticado, redirigir según su rol
      const role = localStorage.getItem('role');
      if (role === 'user') {
        return this.router.createUrlTree(['/home/user']);
      } else if (role === 'admin') {
        return this.router.createUrlTree(['/home/admon']);
      } else {
        // En caso de un rol desconocido, redirigir a la página de login o un fallback
        return this.router.createUrlTree(['/login']);
      }
    }
  }
}
