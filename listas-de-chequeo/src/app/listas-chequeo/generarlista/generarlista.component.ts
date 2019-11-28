import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService, BsModalRef } from 'ngx-bootstrap/modal';
import { ListService } from '../../list.service';
import { PlantillaService } from '../../plantilla.service';
import { CriterioService } from '../../criterio.service';
@Component({
  selector: 'app-generarlista',
  templateUrl: './generarlista.component.html',
  styleUrls: ['./generarlista.component.css']
})
export class GenerarlistaComponent implements OnInit {
  modalRef: BsModalRef;
  errorMsg: ErrorMsg = new ErrorMsg();
  Lista: lista = new lista();
  ListaDil: lista = new lista();
  Listas: any;
  plantilla: plantilla = new plantilla();
  plantillaSelect: '';
  plantillas: any;
  pruebaP: any;
  year: number = 19;
  resultado: number = 0;
  porce: number = 0;
  counter:number = 0;
  ultimoID: number;
  id = { 'id': '' };
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: BsModalService, private plantillaService: PlantillaService, private criterioService: CriterioService, private listService: ListService) {
    modalService.config = { backdrop: 'static', keyboard: false };
  }

  ngOnInit() {
    this.getLista();
    this.getPlantilla();
  }
  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);

  }
  openModalDilegenciar(template: TemplateRef<any>, Lista) {
    this.modalRef = this.modalService.show(
      template,
      Object.assign({}, { class: 'gray modal-lg' })
    );
    console.log(Lista.plantilla.criterios);
    this.ListaDil = Lista;
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
  getPlantilla() {
    this.plantillaService.get().subscribe(res => {
      this.plantillas = res;
    }, error => {
      console.log(error);
    });
  }
  getLista() {
    this.listService.get().subscribe(res => {
      this.Listas = res;
      console.log(this.Listas);
    }, error => {
      console.log(error);
    });
  }
  onSelect() {
    console.log(this.plantillaSelect);
    this.id.id = this.plantillaSelect;
    this.listService.getPlantilla(this.id).subscribe(res => {
      this.pruebaP = res;
      this.Lista.plantilla = res[0];
    }, error => {
      console.log(error);
    });
    // this.criteriosSelect.push(cri);
    // this.prueba=this.criteriosSelect;
  }
  ultimoRegistro() {
    this.Listas.forEach(element => this.ultimoID = element.id);
  }


  // create-plantilla
  onSave() {
    this.ultimoRegistro()
    this.errorMsg.nombre = this.errorMsg.observacion = this.errorMsg.referencia = '';
    !this.Lista.nombre ? this.errorMsg.nombre = 'Requiere nombre' : '';
    !this.Lista.observacion ? this.errorMsg.observacion = 'Requiere observacion' : '';
    !this.Lista.referencia ? this.errorMsg.referencia = 'Requiere referencia' : '';
    this.Lista.id = this.ultimoID + 1;
    this.Lista.estado = 'Pendiente';
    if (!this.Lista.nombre || !this.Lista.observacion || this.Lista.referencia || this.Lista.estado) {
      this.listService.post(this.Lista).subscribe(res => {
        console.log(res);
        this.getLista();
         this.modalRef.hide();
      }, error => {
        console.log(error + 'Error al crear la lista de chequeo');
      });
      return;
    }
  }
  onCheck(i, res) {
    console.log(res)
    this.ListaDil.plantilla.criterios[i].respuesta = res;
  }
  openModalDelete(template: TemplateRef<any>, id, estado) {
    this.modalRef = this.modalService.show(template);
    if (estado === 'Pendiente') {
      this.id.id = id;
    } else {
      alert("No se puede borrar este registro");
    }
  }

  onDelete() {
    this.listService.delete(this.id).subscribe(res => {
      this.getLista();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }
  onSaveList() {
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
    this.listService.update(this.ListaDil).subscribe(res => {
      this.getLista();
      // this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }
  onVersionar() {
    let validador = true;
    let pesoP = 0;
    let killer = true;
    let count=0;
    this.counter=0;
    this.ListaDil.evaluacion = 0;
    this.ListaDil.plantilla.criterios.forEach(element => {
      if (element.respuesta !== 'VERDADERO' && element.respuesta !== 'FALSO' && element.respuesta !== 'NO APLICA') {
        validador = false;
      }
      if ( element.respuesta === 'VERDADERO') {
        pesoP = pesoP + element.peso;
        this.ListaDil.evaluacion += element.peso;
      } else if (element.respuesta === 'FALSO') {
         pesoP = pesoP + element.peso;
      }
      if (element.respuesta === 'FALSO' && element.killer === 'SI') {
        killer = false;
        count+=1;
      }
    });
    this.counter=count;
    this.ListaDil.evaluacion = parseInt(this.ListaDil.evaluacion.toFixed(2));
    if (killer) {
      if (this.ListaDil.evaluacion >= (pesoP * 0.8)) {
        this.ListaDil.estado = 'Válido';
        this.onSaveList();
      } else {
        this.ListaDil.estado = 'Insuficiente';
        this.onSaveList();
      }
    } else {
      this.ListaDil.estado = 'Insuficiente';
      this.onSaveList();
    }
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
