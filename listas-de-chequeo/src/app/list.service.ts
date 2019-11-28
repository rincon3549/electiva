import { Injectable } from '@angular/core';
import { HttpClient} from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class ListService {

  constructor(private http: HttpClient) { }
  baseUrl = 'http://localhost:8070';
  get() {
    return this.http.get(this.baseUrl + '/api/getListChecks');
  }
  getVersionado(){
    return this.http.get(this.baseUrl + '/api/getListChecksVersionado');
  }
  getPlantilla(id) {
    return this.http.post(this.baseUrl + '/api/getPlantillaID', id);
  }
  post(data) {
    return this.http.post(this.baseUrl + '/apis/SaveListChecks', data);
  }
  update(data) {
    return this.http.post(this.baseUrl + '/api/UpadateLista', data);
  }
  delete(id) {
    return this.http.post(this.baseUrl + '/api/deleteListChecks', id);
  }
}
