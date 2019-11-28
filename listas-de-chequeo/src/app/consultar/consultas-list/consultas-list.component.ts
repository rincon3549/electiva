import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ListService } from '../../list.service';
import { PlantillaService } from '../../plantilla.service';
import { CriterioService } from '../../criterio.service';
@Component({
  selector: 'app-consultas-list',
  templateUrl: './consultas-list.component.html',
  styleUrls: ['./consultas-list.component.css']
})
export class ConsultasListComponent implements OnInit {
 modalRef: BsModalRef;
 year: number = 19;
 Lista: lista = new lista();
 Listas: any;
 ListaDil: lista = new lista();
 resultado: number = 0;
 porce: number = 0;
 counter:number = 0;
  // tslint:disable-next-line: max-line-length
  constructor( private modalService: BsModalService, private plantillaService: PlantillaService, private criterioService: CriterioService, private listService: ListService ) { }

  ngOnInit() {
    this.getLista();
  }
  getLista() {
    this.listService.getVersionado().subscribe(res => {
      this.Listas = res;
      console.log(this.Listas);
    }, error => {
      console.log(error);
    });
  }
  openModalPDF(template: TemplateRef<any>, Lista) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    console.log(Lista.plantilla.criterios);
    this.ListaDil = Lista;
    let numer;
    let count=0;
    this.resultado = 0;
    this.porce = 0;
    this.ListaDil.plantilla.criterios.forEach(element => {
      if (element.respuesta === 'VERDADERO') {
       this.resultado = this.resultado + element.peso;
       this.porce = this. porce + element.peso;
      } else if (element.respuesta === 'FALSO') {
        this.porce = this. porce + element.peso;
        if(element.killer === 'SI'){
            count += 1;
        }
      }
    });
    numer =  (this.porce * 0.8);
    this.porce = parseInt(numer.toFixed(2));
    this.resultado = parseInt(this.resultado.toFixed(2));
    this.counter = count;
  }

}
class lista {
  id: number;
  nombre: String;
  observacion: String;
  referencia: String;
  evaluacion: number;
  estado: String;
  versionAt: Date;
  plantilla: plantilla;
}
class ErrorMsg {
  id: number;
  nombre: String;
  observacion: String;
  referencia: String;
  evaluacion: number;
  estado: String;
  versionAt: Date;
  plantilla: plantilla;
}

class plantilla {
  nombre: String;
  descripcion: String;
  criterios: [criterio];
  status: 'String';
  logCreatedBy: String;
  logUpdateBy: String;
  logCreatedByAt: Date;
  logUpdateByAt: Date;
}

class criterio {
  nombre: String;
  descripcion: String;
  tipo: String;
  peso: number;
  killer: String;
  respuesta: String;
}
