import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {AuthGuard} from "../../core/guards/auth.guard";

const routes: Routes = [

  {
    path: 'user', // http://localhost:4200/home/user
    loadComponent: () => import('./pages/users/home/home.component')
      .then(m => m.HomeComponent),
    canActivate:[AuthGuard],
  },
  {
    path: 'admon',
    loadComponent: () => import('./pages/admin/home/home.component')
      .then(m => m.HomeComponent),
    canActivate:[AuthGuard],
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancanetRoutingModule { }
