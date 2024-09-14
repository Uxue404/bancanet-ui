import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/login/login.component')
      .then(m => m.LoginComponent),
  },
  {
    path: 'home',
    loadChildren: () => import('./modules/bancanet/bancanet.module')
      .then(m => m.BancanetModule),
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
