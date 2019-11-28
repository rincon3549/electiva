import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { CriterioListComponent } from '../criterios/criterio-list/criterio-list.component'

const routes: Routes = [{
  path: '',
  component: CriterioListComponent
}];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class CriteriosRoutingModule { }
