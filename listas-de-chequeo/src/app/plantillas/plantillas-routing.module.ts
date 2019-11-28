import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { PlantillaListComponent } from '../plantillas/plantilla-list/plantilla-list.component';

const routes: Routes = [{
  path: '',
  component: PlantillaListComponent
}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PlantillasRoutingModule { }
