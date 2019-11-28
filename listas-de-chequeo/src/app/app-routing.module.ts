import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


const routes: Routes = [{
  path: '',
  redirectTo: '',
  pathMatch: 'full',
}, {
  path: 'criterios',
  loadChildren: './criterios/criterios.module#CriteriosModule'
}, {
  path: 'plantillas',
  loadChildren: './plantillas/plantillas.module#PlantillasModule'
}, {
  path: 'users',
  loadChildren: './users/users.module#UsersModule'
}, {
  path: 'listas',
  loadChildren: './listas-chequeo/listas-chequeo.module#ListasChequeoModule'
}, {
  path: 'consulta',
  loadChildren: './consultar/consultar.module#ConsultarModule'
}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
