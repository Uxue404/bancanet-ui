import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [

  {
    path: '', // http://localhost:4200/home
    loadComponent: () => import('./pages/home/home.component')
      .then(m => m.HomeComponent),
  }

];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class BancanetRoutingModule { }
