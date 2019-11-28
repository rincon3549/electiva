import { Component, OnInit, TemplateRef } from '@angular/core';
import { BsModalService } from 'ngx-bootstrap/modal'
import { BsModalRef} from 'ngx-bootstrap/modal/bs-modal-ref.service'
import { PlantillaService } from '../../plantilla.service';
import { CriterioService } from '../../criterio.service';
@Component({
  selector: 'app-plantilla-list',
  templateUrl: './plantilla-list.component.html',
  styleUrls: ['./plantilla-list.component.css']
})
export class PlantillaListComponent implements OnInit {
  modalRef: BsModalRef;
  errorMsg: ErrorMsg = new ErrorMsg();
  criterio: criterio = new criterio();
  plantilla: plantilla = new plantilla();
  plantillas: any;
  criterios: any;
  prueba: any;
  criteriosSelect: criterio[] = new Array();
  editPlantilla: any;
  id = { 'id': ''};
  // tslint:disable-next-line: max-line-length
  constructor(private modalService: BsModalService, private plantillaService: PlantillaService, private criterioService: CriterioService) { }

  ngOnInit() {
   this.getPlantilla();
   this.getCriterio();
  }
  getPlantilla() {
    this.plantillaService.get().subscribe(res => {
      this.plantillas = res;
    }, error => {
      console.log(error);
    });
  }
  getCriterio() {
    this.criterioService.get().subscribe(res => {
      this.criterios = res;
    }, error => {
      console.log(error);
    });
  }
  openModalEdit(template: TemplateRef<any>, plantilla){
    this.modalRef = this.modalService.show(template);
    console.log(plantilla);
    this.editPlantilla = plantilla;
  }
  openModalDelete(template: TemplateRef<any>, id){
    this.modalRef = this.modalService.show(template);
    this.id.id = id;
  }

  openModalAdd(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalSelectCriterios(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }
  openModalSelectCriteriosEDIT(template: TemplateRef<any>) {
    this.modalRef = this.modalService.show(template);
  }

  onSelect(cri){
    this.criteriosSelect.push(cri);
    this.prueba = this.criteriosSelect;
  }
 onCloseSelec(){
  this.plantilla.criterios = this.prueba;
  this.modalRef.hide();
 }
 onCloseSelecEDIT(){
  this.editPlantilla.criterios = this.prueba;
  this.modalRef.hide();
 }
  onSave(){
    this.errorMsg.nombre = this.errorMsg.descripcion =this.errorMsg.logCreatedBy=this.errorMsg.status='';
    !this.plantilla.nombre?this.errorMsg.nombre="Requiere nombre":'';
    !this.plantilla.descripcion?this.errorMsg.descripcion="Requiere descripcion":'';
    !this.plantilla.logCreatedBy?this.errorMsg.logCreatedBy="Requiere log create":'';
    !this.plantilla.status?this.errorMsg.status="Requiere status":'';

    console.log('prueba' + this.plantilla.criterios);
    if (!this.plantilla.nombre || !this.plantilla.descripcion || this.plantilla.logCreatedBy || this.plantilla.status ) {
      this.plantillaService.post(this.plantilla).subscribe(res => {
        this.criteriosSelect = new Array();
        this.getPlantilla();
        this.modalRef.hide();
      },error=>{
        console.log(error);
      });
      return;
    }
  }
  deleteCriterio() {
    this.plantillaService.delete(this.id).subscribe(res => {
      this.getPlantilla();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });
  }

  onUpdate() {
    this.plantillaService.update(this.editPlantilla).subscribe(res => {
      console.log(res)
      this.getPlantilla();
      this.modalRef.hide();
    }, error => {
      console.log(error);
    });

  }

}
class plantilla{
  nombre :  String ;
  descripcion : String;
  criterios : [criterio];
  status: String;
  logCreatedBy : String;
  logUpdateBy :String;
  logCreatedByAt :  Date;
  logUpdateByAt : Date;
}
class ErrorMsg{
  nombre:String;
  descripcion:String;
  status:String;
  logCreatedBy:String;
  logUpdateBy:String;
}
class criterio{
  nombre:String;
  descripcion:String;
  tipo:String;
  peso:number;
  killer:String;
}
