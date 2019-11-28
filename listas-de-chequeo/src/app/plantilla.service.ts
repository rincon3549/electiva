import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class PlantillaService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8070';
  get(){
    return this.http.get(this.baseUrl + '/api/getPlantillas');
  }
  post(data){
    return this.http.post(this.baseUrl + '/apis/SavePlantilla', data);
  }
  update(data){
    return this.http.post(this.baseUrl + '/api/UpadatePlantillas', data); 
  }
  delete(id){
    return this.http.post(this.baseUrl + '/api/deletePlantillas', id); 
  }
}
