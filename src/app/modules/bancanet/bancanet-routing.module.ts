import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: 'user', // http://localhost:4200/home/user
    loadComponent: () => import('./pages/users/home/home.component')
      .then(m => m.HomeComponent),
  },
  {
    path: 'admon',
    loadComponent: () => import('./pages/admin/home/home.component')
      .then(m => m.HomeComponent),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancanetRoutingModule { }
