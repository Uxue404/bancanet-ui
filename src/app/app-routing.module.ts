import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "./core/guards/auth.guard";
import {NonAuthGuard} from "./core/guards/non-auth.guard";

const routes: Routes = [
  {
    path: 'login',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent),
    canActivate:[NonAuthGuard],

  },
  {
    path: 'home',
    loadChildren: () => import('./modules/bancanet/bancanet.module')
      .then(m => m.BancanetModule),
        canActivate:[AuthGuard],
  },
  {
    path: '**',
    redirectTo: 'login',

  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
