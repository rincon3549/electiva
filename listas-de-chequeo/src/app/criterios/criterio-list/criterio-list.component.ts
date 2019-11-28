import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'
import { CriterioService } from '../../criterio.service';
@Component({
  selector: 'app-criterio-list',
  templateUrl: './criterio-list.component.html',
  styleUrls: ['./criterio-list.component.css']
})
export class CriterioListComponent implements OnInit {
  modalRef: BsModalRef;
  errorMsg: ErrorMsg = new ErrorMsg();
  criterio: criterio = new criterio();
  criterios: any;
  editCriterio: any;
  id = { 'id' : ''};
  constructor(private modalService: BsModalService, private criterioService: CriterioService) {}

  ngOnInit() {
    this.getCriterio();
  }
  getCriterio() {
    this.criterioService.get().subscribe(res => {
      this.criterios = res;
      console.log(this.criterios);
    }, error => {
      console.log(error);
    })
  }
  onSave(){
    this.errorMsg.nombre = this.errorMsg.descripcion =this.errorMsg.tipo = this.errorMsg.killer = this.errorMsg.peso = '';
    !this.criterio.nombre ? this.errorMsg.nombre = 'Requiere nombre' : '';
    !this.criterio.descripcion ? this.errorMsg.descripcion = 'Requiere descripcion': '';
    !this.criterio.tipo  ? this.errorMsg.tipo = 'Requiere tipo' : '';
    !this.criterio.peso ? this.errorMsg.peso = 'Requiere peso': '';
    !this.criterio.killer ? this.errorMsg.killer = 'Requiere killer' : '' ;
    if(!this.criterio.nombre || !this.criterio.descripcion || this.criterio.killer || ! this.criterio.peso) {
      this.criterio.respuesta = "opcion";
      this.criterioService.post(this.criterio).subscribe(res =>{
        this.getCriterio();
        this.modalRef.hide();
        console.log(res);
      }, error => {
        console.log(error);
      });
      return;
    }
  }
  deleteCriterio(){
    this.criterioService.delete(this.id).subscribe(res =>{
      this.getCriterio();
      this.modalRef.hide();
    },error =>{
      console.log(error);
    })
  }

  onUpdate(){
    this.criterioService.update(this.editCriterio).subscribe(res=>{
      this.getCriterio();
      this.modalRef.hide();
    },error =>{
      console.log(error);
    })

  }
  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalEdit(template: TemplateRef<any>, criterio ){
    this.modalRef = this.modalService.show(template);
    this.editCriterio=criterio;
  }
  openModalDelete(template: TemplateRef<any>, id){
    this.modalRef = this.modalService.show(template);
    this.id.id = id;
  }
}
class criterio {
  nombre: String ;
  descripcion:String;
  tipo:String;
  peso:number;
  killer:String;
  respuesta:String;
}
class ErrorMsg{
  nombre:String;
  descripcion:String;
  tipo:String;
  peso:String;
  killer:String;
}

