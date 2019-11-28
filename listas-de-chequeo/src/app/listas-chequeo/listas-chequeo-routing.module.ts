import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { GenerarlistaComponent } from '../listas-chequeo/generarlista/generarlista.component';

const routes: Routes = [{
  path:'',
  component: GenerarlistaComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListasChequeoRoutingModule { }
