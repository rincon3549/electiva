import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ConsultarRoutingModule } from './consultar-routing.module';
import { ConsultasListComponent } from './consultas-list/consultas-list.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';

@NgModule({
  declarations: [ConsultasListComponent],
  imports: [
    CommonModule,
    ConsultarRoutingModule,
    ModalModule,
    FormsModule,
    PDFExportModule
  ]
})
export class ConsultarModule { }
