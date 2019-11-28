import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ListasChequeoRoutingModule } from './listas-chequeo-routing.module';
import { GenerarlistaComponent } from './generarlista/generarlista.component';
import { ModalModule } from 'ngx-bootstrap';
import { FormsModule} from '@angular/forms';
import { PDFExportModule } from '@progress/kendo-angular-pdf-export';
@NgModule({
  declarations: [GenerarlistaComponent],
  imports: [
    CommonModule,
    ListasChequeoRoutingModule,
    FormsModule,
    ModalModule.forRoot(),
    PDFExportModule
  ]
})
export class ListasChequeoModule { }
