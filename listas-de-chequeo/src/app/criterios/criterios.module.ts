import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { CriteriosRoutingModule } from './criterios-routing.module';
import { CriterioListComponent } from './criterio-list/criterio-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';
@NgModule({
  declarations: [CriterioListComponent],
  imports: [
    CommonModule,
    CriteriosRoutingModule,
    FormsModule,
    ModalModule.forRoot()
  ]
})
export class CriteriosModule { }
