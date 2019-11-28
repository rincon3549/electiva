import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { PlantillasRoutingModule } from './plantillas-routing.module';
import { PlantillaListComponent } from './plantilla-list/plantilla-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
@NgModule({
  declarations: [PlantillaListComponent],
  imports: [
    CommonModule,
    PlantillasRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    PDFExportModule
  ]
})
export class PlantillasModule { }
