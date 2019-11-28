import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ConsultasListComponent } from './consultas-list/consultas-list.component'

const routes: Routes = [{
  path: '',
  component: ConsultasListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ConsultarRoutingModule { }
